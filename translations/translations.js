import { useLanguageStore } from "@/stores/useLanguageStore";

export const translate = (key) => {
  const language = useLanguageStore((state) => state.language); // Accès à state.state.language

  return translateToLanguage(key, language);
};

export const translateToLanguage = (key, language) => {
  if (!language) return key;
  if (!translations[language][key]) {
    {
      /* DEBUG */
    }
    console.error("translation error\nkey", key, "is missing\n");
  }
  return translations[language]?.[key] || key;
};

const translations = {
  en: {},

  fr: {
    // screen title
    FindSetTitle: "Set builder",
    DisplaySetTitle: "Comparateur",
    SavedSetTitle: "Favoris",
    GalleryTitle: "Galerie",
    SettingsTitle: "Paramètres",

    FindSetTabTitle: "Chercher",
    DisplaySetTabTitle: "Comparer",
    SavedSetTabTitle: "Favoris",
    GalleryTabTitle: "Galerie",
    SettingsTabTitle: "Paramètres",

    // modal title
    DesiredStats: "Stats souhaitées",
    Filters: "Filtres",
    NumberOfSearchResults: "Nombre de résultats de recherche",
    DisplayedStatsInSets: "Stats affichées dans les sets",
    DisplayedStats: "Stats affichées",
    LoadASavedSet: "Charger un set enregistré",
    NameTheSet: "Nommer le set",
    SelectASet: "Selectionner un set",
    Licenses: "Licences",
    DefaultDisplayedStats: "Stats affichées par défault dans les sets",

    // text
    Language: "Langue",
    Theme: "Theme",
    ResetSettingsText: "Souhaitez-vous vraiment réinitialiser les préférences ?",
    DeleteAllSetsInMemoryText: "Souhaitez-vous vraiment supprimer tous les sets enregistrés ?",
    Selected: "Sélectionnés",
    chosenStats: "param.",
    resultStats: "affich.",
    AppliedOnMountForSetBuilderAndComparator: "Appliquées au démarrage pour le Set builder et le Comparateur",

    // placeholder
    SearchEmpty: "Recherchez le set de vos rêves",
    SearchNotFound: "Aucun set trouvé correspondant à ces stats",
    SavedEmpty: "Retrouvez vos sets favoris ici",
    "NoSetFound...": "Aucun set trouvé...",
    YourFavoriteSetsWillAppearHere: "Vos sets favoris apparaîtrons ici",
    None: "Aucun",

    // button label
    Search: "Chercher",
    All: "Toutes",
    MatchDesiredStats: "Copier les stats paramétrées",
    ConfigureDefaultStats: "Configurer les stats affichées par défault",
    SendFeedback: "Faire un retour",
    OpenSourceLicenses: "Licences Open Source",
    ResetSettings: "Réinitialiser les préférences",
    DeleteAllSetsInMemory: "Supprimer tous les sets enregistrés",
    Confirm: "Confirmer",
    Cancel: "Annuler",

    // modal button label
    Close: "Fermer",
    OK: "OK",

    // tooltip text
    ChooseStats: "Choisissez des stats",
    ChooseFilters: "Choisissez des filtres",
    // DisplayedStatsInSets: "Stats affichées dans les sets",
    // DisplayedStats: "Stats affichées",
    ChangeCondition: "Fixer une condition",
    SortSets: "Trier les sets",
    SortElements: "Trier les éléments",
    FilterBodytypes: "Filtrer des types de carroseries",
    AddASet: "Ajouter un set",
    LoadStatsOfASet: "Charger les stats d'un set",
    LoadASet: "Charger un set",
    Edit: "Editer",
    Remove: "Supprimer",
    Save: "Enregistrer",
    LoadTheStats: "Charger les stats",
    LoadTheSet: "Charger le set",
    LoadTheStatsToSearchScreen: "Charger les stats dans l'écran de recherche",
    LoadTheSetToDisplayScreen: "Charger le set dans l'écran de comparaison",
    Copy: "Copier",
    ImportACopiedSet: "Importer un set copié",
    MoreActions: "Plus d'actions",
    Help: "Aide",
    DevelopSliders: "Développer les curseurs",
    ReduceSliders: "Reduire les curseurs",
    DevelopSets: "Développer les sets",
    ReduceSets: "Réduire les sets",
    DefineAValue: "Définissez une valeur",
    StatsOfTheSet: "Stats du set",
    StatsOfTheSets: "Stats des sets",
    close: "Fermer",

    // toast text
    ImportError: "Erreur d'importation",
    ClipboardIsEmpty: "presse-papiers vide",
    IncorrectFormat: "format incorrect",
    ThisSetDoesNotExist: "ce set n'existe pas",
    UnknownError: "erreur inconnue",
    Error: "Erreur",
    SetLimitReached: "limite de sets atteinte",
    TheSettingsHaveBeenReset: "Les préférences ont été réinitialisées",

    // other
    ":": " : ",
    SetFound: "Set trouvé",

    // stat
    speedGround: "Vitesse sol (VS)",
    speedAntiGravity: "Vitesse anti-gravité (VAG)",
    speedWater: "Vitesse eau (VE)",
    speedAir: "Vitesse air (VA)",
    acceleration: "Accélération (Acc)",
    weight: "Poids (Poi)",
    handlingGround: "Maniabilité sol (MS)",
    handlingAntiGravity: "Maniabilité anti-gravité (MAG)",
    handlingWater: "Maniabilité eau (ME)",
    handlingAir: "Maniabilité air (MA)",
    traction: "Adhérence (Adh)",
    miniTurbo: "Mini-turbo (MT)",

    // other stat label
    speed: "Vitesse",
    handling: "Maniabilité",

    // language
    English: "English",
    French: "Français",

    // theme
    Dark: "Sombre",
    Light: "Clair",
    System: "Appareil",

    // sort
    id: "Number",
    name: "Nom",
    classId: "Classe",

    // stat reduced
    SG: "VS",
    SAG: "VAG",
    SW: "VE",
    SA: "VA",
    Acc: "Acc",
    Wei: "Poi",
    HG: "MS",
    HAG: "MAG",
    HW: "ME",
    HA: "MA",
    Tra: "Adh",
    MT: "MT",

    // category
    character: "Personnage",
    body: "Carrosserie",
    kart: "Kart",
    bike: "Moto",
    sportBike: "Moto de sport",
    ATV: "Quad",
    wheel: "Roue",
    glider: "Aile",

    // element
    //  character
    BabyPeach: "Bébé Peach",
    BabyDaisy: "Bébé Daisy",
    BabyRosalina: "Bébé Harmonie",
    Lemmy: "Lemmy",
    BabyMario: "Bébé Mario",
    BabyLuigi: "Bébé Luigi",
    DryBones: "Skelerex",
    LightMii: "Mii léger",
    Toadette: "Toadette",
    Wendy: "Wendy",
    Isabelle: "Marie",
    Koopa: "Koopa",
    Lakitu: "Lakitu",
    "BowserJr.": "Bowser Jr.",
    Toad: "Toad",
    ShyGuy: "Maskass",
    Larry: "Larry",
    CatPeach: "Peach Chat",
    InklingGirl: "Fille Inkling",
    VillagerFemale: "Villageoise",
    DiddyKong: "Diddy Kong",
    Peach: "Peach",
    Daisy: "Daisy",
    Yoshi: "Yoshi",
    Birdo: "Birdo",
    Peachette: "Peachette",
    TanookiMario: "Mario Tanuki",
    InklingBoy: "Garçon Inkling",
    VillagerMale: "Villageois",
    Mario: "Mario",
    Ludwig: "Ludwig",
    MediumMii: "Mii moyen",
    Luigi: "Luigi",
    Iggy: "Iggy",
    Kamek: "Kamek",
    Rosalina: "Harmonie",
    KingBoo: "Roi Boo",
    Link: "Link",
    Pauline: "Pauline",
    PeteyPiranha: "Flora piranha",
    MetalMario: "Mario de métal",
    PinkGoldPeach: "Peach d'or rose",
    Waluigi: "Waluigi",
    DonkeyKong: "Donkey Kong",
    Roy: "Roy",
    Wiggler: "Wiggler",
    Wario: "Wario",
    DryBowser: "Bowser Skelet",
    HeavyMii: "Mii lourd",
    FunkyKong: "Funky Kong",
    Bowser: "Bowser",
    Morton: "Morton",
    //  body
    StandardKart: "Kart Standard",
    "300SLRoadster": "300 SL Roadster",
    PipeFrame: "Kart rétro",
    Mach8: "Proto 8",
    SportsCoupe: "Propulsar",
    SteelDriver: "Nautomobile",
    "Tri-Speeder": "Tubul R3",
    CatCruiser: "Chabriolet",
    "B-Dasher": "Intrépide",
    CircuitSpecial: "Mach-célère",
    "P-Wing": "Magikart",
    Badwagon: "Beat-bolide",
    GLA: "GLA",
    Prancer: "Cavalkart",
    Biddybuggy: "Paracoccinelly",
    Streetle: "Autorhino",
    Landship: "Caravéloce",
    Sneaker: "Sneakart",
    GoldKart: "Or",
    W25SilverArrow: "W25 Flèche d'argent",
    BlueFalcon: "Blue Falcon",
    TanookiBuggy: "Buggy tanuki",
    KoopaClown: "Koopa-mobile",
    TheDuke: "Cybertrombe",
    Varmint: "Mécabécane",
    CityTripper: "Scooter AC",
    "Mr.Scooty": "Scootinette",
    StandardBike: "Moto Standard",
    FlameRider: "Flamboyante",
    MasterCycleZero: "Destrier de légende 0.1",
    Comet: "Météore",
    YoshiBike: "Yoshimoto",
    SportBike: "Sport GP",
    JetBike: "Epervier",
    MasterCycle: "Destrier de légende",
    Inkstriker: "Missile tornade",
    BoneRattler: "Malécycle",
    TeddyBuggy: "Quad nounours",
    StandardATV: "Quad Standard",
    WildWiggler: "Quad Wiggler",
    SplatBuggy: "Kartoon",
    //  wheel
    Standard: "Standard",
    BlueStandard: "Standard bleu",
    GLATires: "GLA",
    Monster: "Mastodonte",
    HotMonster: "Masto-flammes",
    AncientTires: "Archéonique",
    Roller: "Roller",
    AzureRoller: "Roller azur",
    Slim: "Classique",
    CrimsonSlim: "Classique rouge",
    Wood: "Bois",
    Slick: "Lisse",
    CyberSlick: "Cyber-lisse",
    Metal: "Métal",
    GoldTires: "Roue Or",
    Button: "Bouton",
    LeafTires: "Feuille",
    "Off-Road": "Hors-piste",
    "RetroOff-Road": "Hors-piste rétro",
    TriforceTires: "Triforce",
    Cushion: "Coussin",
    Sponge: "Eponge",
    //  glider
    SuperGlider: "Standard",
    WaddleWing: "Dendinaile",
    HylianKite: "Aile hylienne",
    CloudGlider: "Aile nuages",
    ParachuteGlider: "Parachute",
    FlowerGlider: "Aile fleurie",
    PaperGlider: "Aile en papier",
    WarioWing: "Aile Wario",
    PlaneGlider: "Planeur",
    GoldGlider: "Or",
    Paraglider: "Paravoile",
    PeachParasol: "Ombrelle Peach",
    BowserKite: "Bowser-volant",
    ParafoilGlider: "Parapente",
    MKTVParafoilGlider: "Parapente MKTV",

    // Help modals
    "Guide des Sets Favoris": "Guide des Sets Favoris",
    "Guide du Set Builder": "Guide du Set Builder",
    "Guide du Comparateur de Sets": "Guide du Comparateur de Sets",

    // Misc
    Warning: "Attention",
  },
};
