import { create } from "zustand";
import * as Clipboard from "expo-clipboard";
import "react-native-get-random-values";
import { router } from "expo-router";

// Data and Types
import { ScreenName } from "@/contexts/ScreenContext";
import { MAX_NUMBER_BUILDS_DISPLAY, MAX_NUMBER_BUILDS_SAVE } from "./useBuildsListStore";
import { Build, BuildPersistant } from "@/data/builds/buildsTypes";

// Utilities
import { checkFormatBuildImported } from "@/utils/checkFormatBuildImported";

// Stores
import useStatsStore from "./useStatsStore";
import useBuildsListStore from "./useBuildsListStore";
import useBuildsPersistenceStore from "./useBuildsPersistenceStore";
import useGeneralStore from "./useGeneralStore";
import { buildsDataMap } from "@/data/builds/buildsData";
import useDeckStore from "./useDeckStore";
import { t } from "i18next";
import { BuildAlreadyExistsError, NameAlreadyExistsError } from "@/errors/errors";

export interface BuildsActionsStoreState {
  loadBuildCard: (params: { source?: ScreenName; buildDataId?: string; build?: Build; target: ScreenName }) => Build;
  loadToSearch: (params: { source?: ScreenName; buildDataId?: string; build?: Build }) => void;
  loadToDisplay: (params: { source: ScreenName; buildDataId: string }) => void;
  loadBuildsSaved: () => void;
  saveBuild: (source: ScreenName, buildDataId: string) => Promise<void>;
  unSaveBuild: (screenName: ScreenName, buildDataId: string) => void;
  exportBuild: (screenName: ScreenName, buildDataId: string) => void;
  importBuild: (clipboardContent: string, screenName: ScreenName) => void;
}

const useBuildsActionsStore = create<BuildsActionsStoreState>((set, get) => ({
  loadBuildCard: (params: { source?: ScreenName; buildDataId?: string; build?: Build; target: ScreenName }) => {
    const { source, buildDataId, build: providedBuild, target } = params;

    // on récupère build depuis les props ou bien on le calcule
    // et on retire percentage
    let build: Build;
    if (providedBuild) {
      const { percentage, ...build_ } = providedBuild;
      build = build_;
    } else {
      const { percentage, ...build_ } = useBuildsListStore.getState().getBuild(source, buildDataId);
      build = build_;
    }

    const name = useDeckStore.getState().deck.get(build.buildDataId)?.name;
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

    const setBuildsListTarget = useBuildsListStore.getState().getSetBuildsList(target);
    setBuildsListTarget(newBuildsListTarget);
    return build;
  },

  loadToSearch: (params: { source?: ScreenName; buildDataId?: string; build?: Build }) => {
    const { source, buildDataId, build: providedBuild } = params;

    // on récupère build depuis les props ou bien on le calcule
    // pas nécessaire de retirer percentage
    let build: Build;
    if (providedBuild) {
      build = providedBuild;
    } else {
      build = useBuildsListStore.getState().getBuild(source, buildDataId);
    }

    const stats = buildsDataMap.get(build.buildDataId).stats;

    useStatsStore.getState().loadBuildStats(stats);

    router.push({ pathname: "/", params: { scrollToTop: "true" } });
    useGeneralStore.getState().setShouldScrollToTop();
  },

  loadToDisplay: (params: { source: ScreenName; buildDataId: string }) => {
    const { source, buildDataId } = params;

    get().loadBuildCard({ source, buildDataId, target: "display" });

    router.push({ pathname: "/DisplayBuildScreen", params: { scrollToTop: "true" } });
    useGeneralStore.getState().setShouldScrollToTop();
  },

  loadBuildsSaved: async () => {
    const buildsPersistant = await useBuildsPersistenceStore.getState().fetchBuildsSaved();

    const buildsListSaved: Build[] = buildsPersistant.map((buildPersistant) => ({
      buildDataId: buildPersistant.buildDataId,
    }));

    useBuildsListStore.getState().setBuildsListSaved(buildsListSaved);
    useDeckStore.getState().loadBuildsSaved(buildsPersistant);
  },

  saveBuild: async (source: ScreenName, buildDataId: string) => {
    const buildsListSaved = useBuildsListStore.getState().buildsListSaved;
    if (buildsListSaved.length >= MAX_NUMBER_BUILDS_SAVE) {
      throw new Error("buildLimitReachedInThisScreen");
    }

    const build = useBuildsListStore.getState().getBuild(source, buildDataId);

    const name = useDeckStore.getState().deck.get(build.buildDataId)?.name;
    if (!name) {
      throw new Error("buildNameRequiredForSaving");
    }

    get().loadBuildCard({ build: build, target: "save" });
    await useBuildsPersistenceStore.getState().saveBuildInMemory(build, name);
    useDeckStore.getState().saveBuild(build.buildDataId);
  },

  unSaveBuild: (screenName: ScreenName, buildDataId: string) => {
    const build = useBuildsListStore.getState().getBuild(screenName, buildDataId);
    console.log("build", build);
    console.log("ok1");
    useBuildsListStore.getState().removeBuild(buildDataId, "save");

    console.log("ok4");
  },

  exportBuild: (screenName, buildDataId) => {
    const build = useBuildsListStore.getState().getBuild(screenName, buildDataId);
    const name = useDeckStore.getState().deck.get(build.buildDataId)?.name;

    if (!name) {
      throw new Error("buildNameRequiredForSharing");
    }

    const json = JSON.stringify({ name: name, buildDataId: build.buildDataId });
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

    const build: BuildPersistant = { ...parsedBuild };

    if (screenName === "search") {
      get().loadToSearch({ build });
    } else {
      const sameBuild = useBuildsListStore
        .getState()
        .findSameBuildInThisScreen({ buildDataId: build.buildDataId, screenName: screenName });

      if (sameBuild) {
        const buildName = useDeckStore.getState().deck.get(sameBuild.buildDataId)?.name;
        throw new BuildAlreadyExistsError(buildName);
      }

      const isNameFree = useDeckStore.getState().checkNameFree(build.name);
      if (!isNameFree) {
        throw new NameAlreadyExistsError(build.name);
      }

      get().loadBuildCard({ build, target: screenName });
      if (screenName === "save") {
        const name = useDeckStore.getState().deck.get(build.buildDataId).name;
        useBuildsPersistenceStore.getState().saveBuildInMemory(build, name);
      }
    }
  },
}));

export default useBuildsActionsStore;
