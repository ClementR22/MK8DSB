import { create } from "zustand";
import * as Clipboard from "expo-clipboard";
import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { router } from "expo-router";

// Data and Types
import { ScreenName } from "@/contexts/ScreenContext";
import { MAX_NUMBER_BUILDS_DISPLAY, MAX_NUMBER_BUILDS_SAVE } from "./useBuildsListStore";
import { Build, BuildPersistant } from "@/data/builds/buildsTypes";

// Utilities
import { arraysEqual } from "@/utils/deepCompare";
import { checkFormatBuildImported } from "@/utils/checkFormatBuildImported";

// Stores
import useStatsStore from "./useStatsStore";
import useBuildsListStore from "./useBuildsListStore";
import useBuildsPersistenceStore from "./useBuildsPersistenceStore";
import useGeneralStore from "./useGeneralStore";
import { buildsDataMap } from "@/data/builds/buildsData";
import useDeckStore, { BuildEntry } from "./useDeckStore";
import { t } from "i18next";

export interface BuildsActionsStoreState {
  loadBuildCard: (params: { source?: ScreenName; id?: string; build?: Build; target: ScreenName }) => Build;
  loadToSearch: (params: { source?: ScreenName; id?: string; build?: Build }) => void;
  loadToDisplay: (params: { source: ScreenName; id: string }) => void;
  loadBuildsSaved: () => void;
  saveBuild: (source: ScreenName, id: string) => Promise<void>;
  unSaveBuild: (screenName: ScreenName, id: string) => Promise<void>;
  exportBuild: (screenName: ScreenName, id: string) => void;
  importBuild: (clipboardContent: string, screenName: ScreenName) => void;
}

const useBuildsActionsStore = create<BuildsActionsStoreState>((set, get) => ({
  loadBuildCard: (params: { source?: ScreenName; id?: string; build?: Build; target: ScreenName }) => {
    const { source, id, build: providedBuild, target } = params;

    // on récupère build depuis les props ou bien on le calcule
    // et on retire percentage
    let build: Build;
    if (providedBuild) {
      const { percentage, ...build_ } = providedBuild;
      build = build_;
    } else {
      const { percentage, ...build_ } = useBuildsListStore.getState().getBuild(source, id);
      build = build_;
    }

    const name = useDeckStore.getState().deck.get(build.dataId)?.name;
    if (!name) {
      throw new Error("buildNameRequiredForLoading");
    }

    const buildsListTarget = useBuildsListStore.getState().getBuildsList(target).buildsList;

    // vérification de la limit de builds
    if (
      (target === "display" && buildsListTarget.length >= MAX_NUMBER_BUILDS_DISPLAY) ||
      (target === "save" && buildsListTarget.length >= MAX_NUMBER_BUILDS_SAVE)
    ) {
      throw new Error("buildLimitReachedInThisScreen");
    }

    const newBuildsListTarget = [...buildsListTarget, build];

    // on change l'id car dans l'appli, il ne doit pas y avoir 2 builds avec le même id
    build.id = nanoid(8);

    const setBuildsListTarget = useBuildsListStore.getState().getSetBuildsList(target);
    setBuildsListTarget(newBuildsListTarget);
    return build;
  },

  loadToSearch: (params: { source?: ScreenName; id?: string; build?: Build }) => {
    const { source, id, build: providedBuild } = params;

    // on récupère build depuis les props ou bien on le calcule
    // pas nécessaire de retirer percentage
    let build: Build;
    if (providedBuild) {
      build = providedBuild;
    } else {
      build = useBuildsListStore.getState().getBuild(source, id);
    }

    const stats = buildsDataMap.get(build.dataId).stats;

    useStatsStore.getState().loadBuildStats(stats);

    router.push({ pathname: "/", params: { scrollToTop: "true" } });
    useGeneralStore.getState().setShouldScrollToTop();
  },

  loadToDisplay: (params: { source: ScreenName; id: string }) => {
    const { source, id } = params;

    get().loadBuildCard({ source, id, target: "display" });

    router.push({ pathname: "/DisplayBuildScreen", params: { scrollToTop: "true" } });
    useGeneralStore.getState().setShouldScrollToTop();
  },

  loadBuildsSaved: async () => {
    const buildsPersistant = await useBuildsPersistenceStore.getState().fetchBuildsSaved();

    const buildsListSaved: Build[] = buildsPersistant.map((buildPersistant) => ({
      id: buildPersistant.id,
      dataId: buildPersistant.dataId,
    }));

    useBuildsListStore.getState().setBuildsListSaved(buildsListSaved);
    useDeckStore.getState().loadBuildsSaved(buildsPersistant);
  },

  saveBuild: async (source: ScreenName, id: string) => {
    const buildsListSaved = useBuildsListStore.getState().buildsListSaved;
    if (buildsListSaved.length >= MAX_NUMBER_BUILDS_SAVE) {
      throw new Error("buildLimitReachedInThisScreen");
    }

    const build = useBuildsListStore.getState().getBuild(source, id);

    const name = useDeckStore.getState().deck.get(build.dataId)?.name;
    if (!name) {
      throw new Error("buildNameRequiredForSaving");
    }

    get().loadBuildCard({ build: build, target: "save" });
    await useBuildsPersistenceStore.getState().saveBuildInMemory(build, name);
    useDeckStore.getState().saveBuild(build.dataId);
  },

  unSaveBuild: async (screenName: ScreenName, id: string) => {
    const build = useBuildsListStore.getState().getBuild(screenName, id);
    const classIds = buildsDataMap.get(build.dataId).classIds; // okkk

    const buildsListSaved = useBuildsListStore.getState().buildsListSaved;
    const buildsToRemove = buildsListSaved.filter((build) => {
      const buildData = buildsDataMap.get(build.dataId);
      return arraysEqual(buildData.classIds, classIds);
    });

    for (const build of buildsToRemove) {
      useBuildsListStore.getState().removeBuild(build.id, "save");
      await useBuildsPersistenceStore.getState().removeBuildInMemory(build.id);
    }
    useDeckStore.getState().unSaveBuild(build.dataId);
  },

  exportBuild: (screenName, id) => {
    const build = useBuildsListStore.getState().getBuild(screenName, id);
    const name = useDeckStore.getState().deck.get(build.dataId)?.name;

    if (!name) {
      throw new Error("buildNameRequiredForSharing");
    }

    const json = JSON.stringify({ name: name, dataId: build.dataId });
    Clipboard.setStringAsync(json + "\n" + t("text:tutoImportation"));
  },

  importBuild: (clipboardContent: string, screenName: ScreenName) => {
    let parsedBuild: unknown;

    // Cherche le premier JSON dans le texte
    const match = clipboardContent.match(/\{[^{}]*\}/);

    if (!match) return null;
    try {
      parsedBuild = JSON.parse(match[0]);
    } catch (err) {
      throw new Error("incorrectFormat");
    }

    if (!checkFormatBuildImported(parsedBuild)) {
      throw new Error("incorrectFormat");
    }

    const build: BuildPersistant = { ...parsedBuild, id: nanoid(8) };

    if (screenName === "search") {
      get().loadToSearch({ build });
    } else {
      const isNameFree = useDeckStore.getState().checkNameFree(build.name);
      if (!isNameFree) {
      }
      get().loadBuildCard({ build, target: screenName });
      if (screenName === "save") {
        const name = useDeckStore.getState().deck.get(build.dataId).name;
        useBuildsPersistenceStore.getState().saveBuildInMemory(build, name);
      }
    }
  },
}));

export default useBuildsActionsStore;
