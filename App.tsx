import React, { useState } from "react";
import {
  View, Text, StyleSheet, ScrollView, ImageBackground, Pressable,
  Dimensions, StatusBar, Platform
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const { height } = Dimensions.get("window");

const clips = [
  { id: "1", user: "@neon.days", caption: "вечерний город выглядит как отдельная вселенная ✨", song: "оригинальный звук · neon.days", likes: "128,4K", comments: "2 401", image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1200", avatar: "https://i.pravatar.cc/120?img=47" },
  { id: "2", user: "@motion.lab", caption: "маленькие моменты, которые хочется сохранить", song: "motion lab · night drive", likes: "86,2K", comments: "984", image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200", avatar: "https://i.pravatar.cc/120?img=12" },
];

type Tab = "home" | "friends" | "create" | "inbox" | "profile";
type FontChoice = "system" | "rounded" | "serif";
type NavStyle = "glass" | "floating" | "minimal";

const fontFamilies: Record<FontChoice, string | undefined> = {
  system: undefined,
  rounded: Platform.OS === "ios" ? "Avenir Next" : "sans-serif-rounded",
  serif: "Georgia",
};

const navOptions: { id: NavStyle; title: string; detail: string }[] = [
  { id: "glass", title: "Liquid Glass", detail: "Прозрачная стеклянная панель" },
  { id: "floating", title: "Плавающая", detail: "Компактная отдельная панель" },
  { id: "minimal", title: "Минимализм", detail: "Только иконки и подписи" },
];

export default function App() {
  const [tab, setTab] = useState<Tab>("home");
  const [liked, setLiked] = useState<string[]>([]);
  const [following, setFollowing] = useState<string[]>([]);
  const [fontChoice, setFontChoice] = useState<FontChoice>("system");
  const [navStyle, setNavStyle] = useState<NavStyle>("glass");

  const font = fontFamilies[fontChoice];
  const toggleLike = (id: string) => setLiked(old => old.includes(id) ? old.filter(x => x !== id) : [...old, id]);
  const toggleFollow = (user: string) => setFollowing(old => old.includes(user) ? old.filter(x => x !== user) : [...old, user]);

  const navItems: [Tab, keyof typeof Ionicons.glyphMap, string][] = [
    ["home", "home-outline", "Главная"],
    ["friends", "people-outline", "Друзья"],
    ["create", "add", "Создать"],
    ["inbox", "chatbubble-ellipses-outline", "Входящие"],
    ["profile", "person-outline", "Профиль"],
  ];

  const renderGlassButton = (label: string, selected: boolean, onPress: () => void) => (
    <Pressable onPress={onPress} style={[styles.choice, selected && styles.choiceSelected]}>
      <Text style={[styles.choiceText, { fontFamily: font }, selected && styles.choiceTextSelected]}>{label}</Text>
      {selected && <Ionicons name="checkmark-circle" size={17} color="#fff" />}
    </Pressable>
  );

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={["#22252b", "#101216", "#070809"]} style={StyleSheet.absoluteFill} />
      {tab === "home" ? (
        <View style={styles.feed}>
          <SafeAreaView edges={["top"]} style={styles.topBar}>
            <View style={styles.livePill}>
              <View style={styles.liveDot} />
              <Text style={[styles.liveText, { fontFamily: font }]}>LIVE</Text>
            </View>
            <View style={styles.feedTabs}>
              <Text style={[styles.feedTabMuted, { fontFamily: font }]}>Подписки</Text>
              <View style={styles.activeFeedTab}>
                <Text style={[styles.feedTabActive, { fontFamily: font }]}>Для вас</Text>
                <View style={styles.underline} />
              </View>
            </View>
            <Pressable style={styles.searchButton} onPress={() => setTab("friends")}>
              <Ionicons name="search" size={23} color="#fff" />
            </Pressable>
          </SafeAreaView>
          <ScrollView pagingEnabled showsVerticalScrollIndicator={false} snapToInterval={height - 92} decelerationRate="fast">
            {clips.map(clip => (
              <View key={clip.id} style={styles.clip}>
                <ImageBackground source={{ uri: clip.image }} resizeMode="cover" style={styles.clipImage}>
                  <LinearGradient colors={["rgba(5,6,8,0.12)", "transparent", "rgba(5,6,8,0.9)"]} locations={[0, 0.45, 1]} style={StyleSheet.absoluteFill} />
                  <View style={styles.rightActions}>
                    <View style={styles.avatarWrap}>
                      <ImageBackground source={{ uri: clip.avatar }} style={styles.avatar} imageStyle={{ borderRadius: 30 }} />
                      <Pressable style={styles.followPlus} onPress={() => toggleFollow(clip.user)}>
                        <Ionicons name={following.includes(clip.user) ? "checkmark" : "add"} size={15} color="#111" />
                      </Pressable>
                    </View>
                    <Pressable style={styles.action} onPress={() => toggleLike(clip.id)}>
                      <Ionicons name={liked.includes(clip.id) ? "heart" : "heart-outline"} size={31} color={liked.includes(clip.id) ? "#ff5364" : "#fff"} />
                      <Text style={[styles.actionLabel, { fontFamily: font }]}>{clip.likes}</Text>
                    </Pressable>
                    <Pressable style={styles.action}>
                      <Ionicons name="chatbubble-ellipses-outline" size={29} color="#fff" />
                      <Text style={[styles.actionLabel, { fontFamily: font }]}>{clip.comments}</Text>
                    </Pressable>
                    <Pressable style={styles.action}>
                      <Ionicons name="bookmark-outline" size={27} color="#fff" />
                      <Text style={[styles.actionLabel, { fontFamily: font }]}>Сохранить</Text>
                    </Pressable>
                    <Pressable style={styles.action}>
                      <Ionicons name="share-social-outline" size={27} color="#fff" />
                      <Text style={[styles.actionLabel, { fontFamily: font }]}>Поделиться</Text>
                    </Pressable>
                  </View>
                  <View style={styles.clipInfo}>
                    <View style={styles.userLine}>
                      <Text style={[styles.username, { fontFamily: font }]}>{clip.user}</Text>
                      <View style={styles.creatorBadge}><Ionicons name="checkmark" size={10} color="#111" /></View>
                      <Text style={[styles.followersHint, { fontFamily: font }]}> · автор</Text>
                    </View>
                    <Text style={[styles.caption, { fontFamily: font }]}>{clip.caption}</Text>
                    <View style={styles.soundLine}>
                      <Ionicons name="musical-notes" size={14} color="#fff" />
                      <Text style={[styles.soundText, { fontFamily: font }]}>{clip.song}</Text>
                    </View>
                  </View>
                </ImageBackground>
              </View>
            ))}
          </ScrollView>
        </View>
      ) : tab === "profile" ? (
        <SafeAreaView style={styles.settingsPage} edges={["top"]}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 125 }}>
            <Text style={styles.eyebrow}>TIKTOK MOD · PERSONALIZATION</Text>
            <Text style={[styles.pageTitle, { fontFamily: font }]}>Внешний вид</Text>
            <Text style={[styles.sectionTitle, { fontFamily: font }]}>Шрифт приложения</Text>
            <BlurView intensity={35} tint="dark" style={styles.settingsCard}>
              {renderGlassButton("Системный", fontChoice === "system", () => setFontChoice("system"))}
              {renderGlassButton("Округлый", fontChoice === "rounded", () => setFontChoice("rounded"))}
              {renderGlassButton("С засечками", fontChoice === "serif", () => setFontChoice("serif"))}
            </BlurView>
            <Text style={[styles.sectionTitle, { fontFamily: font }]}>Стиль нижней панели</Text>
            <View style={styles.navStyleList}>
              {navOptions.map(option => (
                <Pressable key={option.id} onPress={() => setNavStyle(option.id)} style={[styles.navStyleCard, navStyle === option.id && styles.navStyleCardSelected]}>
                  <View style={styles.navPreviewRow}>
                    <View style={[styles.previewDock, option.id === "floating" && styles.previewFloating, option.id === "minimal" && styles.previewMinimal]}>
                      {[0, 1, 2, 3, 4].map(n => <View key={n} style={[styles.previewDot, n === 0 && styles.previewDotActive]} />)}
                    </View>
                    {navStyle === option.id && <Ionicons name="checkmark-circle" size={19} color="#fff" />}
                  </View>
                  <Text style={[styles.navStyleTitle, { fontFamily: font }]}>{option.title}</Text>
                  <Text style={[styles.navStyleDetail, { fontFamily: font }]}>{option.detail}</Text>
                </Pressable>
              ))}
            </View>
            <BlurView intensity={28} tint="dark" style={styles.noteCard}>
              <Ionicons name="sparkles-outline" size={20} color="#fff" />
              <Text style={[styles.noteText, { fontFamily: font }]}>Настройки применяются сразу. В следующих версиях добавим больше шрифтов, прозрачности и вариантов оформления.</Text>
            </BlurView>
          </ScrollView>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.placeholder} edges={["top"]}>
          <Text style={styles.eyebrow}>TIKTOK MOD</Text>
          <Text style={[styles.pageTitle, { fontFamily: font }]}>
            {({ friends: "Друзья", create: "Создать", inbox: "Входящие" } as Record<string, string>)[tab]}
          </Text>
          <BlurView intensity={35} tint="dark" style={styles.glassCard}>
            <Ionicons name={({ friends: "people-outline", create: "add-circle-outline", inbox: "chatbubbles-outline" } as Record<string, any>)[tab]} size={34} color="#fff" />
            <Text style={[styles.cardTitle, { fontFamily: font }]}>Скоро здесь будет больше</Text>
            <Text style={[styles.cardText, { fontFamily: font }]}>Сейчас это демонстрационный экран. Подключение аккаунтов, видео, чатов и социальных функций — следующие этапы разработки.</Text>
          </BlurView>
        </SafeAreaView>
      )}

      <BlurView
        intensity={navStyle === "minimal" ? 18 : 55}
        tint="dark"
        style={[
          styles.bottomNav,
          navStyle === "floating" && styles.bottomNavFloating,
          navStyle === "minimal" && styles.bottomNavMinimal,
        ]}
      >
        {navItems.map(([key, icon, label]) => (
          <Pressable key={key} style={styles.navItem} onPress={() => setTab(key)}>
            {key === "create" ? (
              <View style={styles.createButton}><Ionicons name="add" size={27} color="#111" /></View>
            ) : (
              <View style={[styles.navIcon, tab === key && styles.navIconActive]}>
                <Ionicons name={icon} size={22} color={tab === key ? "#fff" : "#aaa"} />
              </View>
            )}
            <Text style={[styles.navLabel, { fontFamily: font }, tab === key && styles.navLabelActive]}>{label}</Text>
          </Pressable>
        ))}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#08090b" },
  feed: { flex: 1 },
  topBar: { position: "absolute", zIndex: 5, top: 0, left: 0, right: 0, height: 82, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 18 },
  livePill: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "rgba(255,255,255,0.18)", borderWidth: 1, borderColor: "rgba(255,255,255,0.28)", borderRadius: 20, paddingHorizontal: 10, paddingVertical: 7, overflow: "hidden" },
  liveDot: { width: 6, height: 6, borderRadius: 4, backgroundColor: "#ff5364" },
  liveText: { color: "#fff", fontSize: 10, fontWeight: "800", letterSpacing: 1 },
  feedTabs: { flexDirection: "row", alignItems: "center", gap: 22 },
  feedTabMuted: { color: "rgba(255,255,255,0.7)", fontSize: 15, fontWeight: "600" },
  activeFeedTab: { alignItems: "center", gap: 7 },
  feedTabActive: { color: "#fff", fontSize: 16, fontWeight: "800" },
  underline: { width: 22, height: 3, borderRadius: 3, backgroundColor: "#fff" },
  searchButton: { width: 34, alignItems: "flex-end" },
  clip: { height: height - 92, width: "100%" },
  clipImage: { flex: 1, justifyContent: "flex-end" },
  rightActions: { position: "absolute", right: 13, bottom: 125, alignItems: "center", gap: 19 },
  avatarWrap: { marginBottom: 4 },
  avatar: { width: 48, height: 48, borderRadius: 30, borderWidth: 1.5, borderColor: "rgba(255,255,255,0.9)", overflow: "hidden" },
  followPlus: { position: "absolute", bottom: -8, alignSelf: "center", backgroundColor: "rgba(255,255,255,0.94)", width: 20, height: 20, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  action: { alignItems: "center", gap: 4 },
  actionLabel: { color: "#fff", fontSize: 10, fontWeight: "700", textShadowColor: "#000", textShadowRadius: 5 },
  clipInfo: { paddingHorizontal: 18, paddingBottom: 112, maxWidth: "82%" },
  userLine: { flexDirection: "row", alignItems: "center", marginBottom: 9 },
  username: { color: "#fff", fontSize: 16, fontWeight: "800" },
  creatorBadge: { backgroundColor: "rgba(255,255,255,0.92)", borderRadius: 7, width: 14, height: 14, alignItems: "center", justifyContent: "center", marginLeft: 6 },
  followersHint: { color: "rgba(255,255,255,0.7)", fontSize: 12 },
  caption: { color: "#fff", fontSize: 14, lineHeight: 20, marginBottom: 10 },
  soundLine: { flexDirection: "row", alignItems: "center", gap: 7 },
  soundText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  bottomNav: { position: "absolute", bottom: 0, left: 10, right: 10, height: 82, flexDirection: "row", justifyContent: "space-around", alignItems: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.2)", borderRadius: 28, paddingBottom: 8, backgroundColor: "rgba(245,247,250,0.12)", overflow: "hidden" },
  bottomNavFloating: { left: 24, right: 24, bottom: 13, height: 70, borderRadius: 24, backgroundColor: "rgba(255,255,255,0.2)", borderColor: "rgba(255,255,255,0.34)", shadowColor: "#000", shadowOpacity: 0.35, shadowRadius: 18, elevation: 12 },
  bottomNavMinimal: { left: 0, right: 0, bottom: 0, height: 75, borderRadius: 0, borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0, borderTopWidth: 1, borderColor: "rgba(255,255,255,0.16)", backgroundColor: "rgba(5,6,8,0.42)" },
  navItem: { flex: 1, alignItems: "center", justifyContent: "center", gap: 3 },
  navIcon: { width: 42, height: 30, alignItems: "center", justifyContent: "center", borderRadius: 15 },
  navIconActive: { backgroundColor: "rgba(255,255,255,0.18)" },
  navLabel: { color: "#b0b0b0", fontSize: 9, fontWeight: "600" },
  navLabelActive: { color: "#fff" },
  createButton: { width: 37, height: 29, borderRadius: 10, backgroundColor: "rgba(255,255,255,0.94)", alignItems: "center", justifyContent: "center" },
  placeholder: { flex: 1, paddingHorizontal: 22, paddingTop: 28 },
  settingsPage: { flex: 1, paddingHorizontal: 20, paddingTop: 18 },
  eyebrow: { color: "rgba(255,255,255,0.58)", letterSpacing: 2.4, fontSize: 10, fontWeight: "800", marginBottom: 9 },
  pageTitle: { color: "#fff", fontSize: 34, fontWeight: "900", marginBottom: 25 },
  sectionTitle: { color: "#fff", fontSize: 17, fontWeight: "800", marginBottom: 11, marginTop: 10 },
  settingsCard: { borderRadius: 23, padding: 10, overflow: "hidden", borderWidth: 1, borderColor: "rgba(255,255,255,0.18)", backgroundColor: "rgba(255,255,255,0.07)", marginBottom: 18 },
  choice: { minHeight: 47, borderRadius: 14, paddingHorizontal: 13, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  choiceSelected: { backgroundColor: "rgba(255,255,255,0.14)" },
  choiceText: { color: "rgba(255,255,255,0.78)", fontSize: 14, fontWeight: "600" },
  choiceTextSelected: { color: "#fff", fontWeight: "800" },
  navStyleList: { gap: 10 },
  navStyleCard: { padding: 14, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.07)", borderWidth: 1, borderColor: "rgba(255,255,255,0.12)" },
  navStyleCardSelected: { backgroundColor: "rgba(255,255,255,0.13)", borderColor: "rgba(255,255,255,0.42)" },
  navPreviewRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 },
  previewDock: { height: 28, width: 150, borderRadius: 15, backgroundColor: "rgba(255,255,255,0.18)", borderWidth: 1, borderColor: "rgba(255,255,255,0.3)", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" },
  previewFloating: { width: 128, height: 25, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.28)" },
  previewMinimal: { width: 150, height: 20, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 0, borderTopWidth: 1 },
  previewDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: "rgba(255,255,255,0.45)" },
  previewDotActive: { backgroundColor: "#fff", width: 12, height: 12, borderRadius: 6 },
  navStyleTitle: { color: "#fff", fontSize: 15, fontWeight: "800", marginBottom: 3 },
  navStyleDetail: { color: "rgba(255,255,255,0.58)", fontSize: 12 },
  noteCard: { marginTop: 18, padding: 16, borderRadius: 18, overflow: "hidden", borderWidth: 1, borderColor: "rgba(255,255,255,0.14)", backgroundColor: "rgba(255,255,255,0.06)", flexDirection: "row", gap: 11, alignItems: "center" },
  noteText: { color: "rgba(255,255,255,0.72)", fontSize: 12, lineHeight: 18, flex: 1 },
  glassCard: { borderRadius: 25, padding: 24, overflow: "hidden", borderWidth: 1, borderColor: "rgba(255,255,255,0.18)", gap: 12, backgroundColor: "rgba(255,255,255,0.07)" },
  cardTitle: { color: "#fff", fontSize: 18, fontWeight: "800" },
  cardText: { color: "#b8bbc2", fontSize: 14, lineHeight: 21 }
});
