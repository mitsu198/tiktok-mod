import React, { useState } from "react";
import {
  View, Text, StyleSheet, ScrollView, ImageBackground, Pressable,
  Dimensions, StatusBar
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const { height } = Dimensions.get("window");

const clips = [
  { id: "1", user: "@neon.days", caption: "вечерний город выглядит как отдельная вселенная ✨", song: " оригинальный звук · neon.days", likes: "128,4K", comments: "2 401", image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1200", avatar: "https://i.pravatar.cc/120?img=47" },
  { id: "2", user: "@motion.lab", caption: "маленькие моменты, которые хочется сохранить", song: "motion lab · night drive", likes: "86,2K", comments: "984", image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1200&sat=-40", avatar: "https://i.pravatar.cc/120?img=12" },
];

type Tab = "home" | "discover" | "create" | "inbox" | "profile";

export default function App() {
  const [tab, setTab] = useState<Tab>("home");
  const [liked, setLiked] = useState<string[]>([]);
  const [following, setFollowing] = useState<string[]>([]);

  const toggleLike = (id: string) => setLiked(old => old.includes(id) ? old.filter(x => x !== id) : [...old, id]);
  const toggleFollow = (user: string) => setFollowing(old => old.includes(user) ? old.filter(x => x !== user) : [...old, user]);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={["#17142b", "#090914", "#05050a"]} style={StyleSheet.absoluteFill} />
      {tab === "home" ? (
        <View style={styles.feed}>
          <SafeAreaView edges={["top"]} style={styles.topBar}>
            <Pressable style={styles.livePill}><View style={styles.liveDot} /><Text style={styles.liveText}>LIVE</Text></Pressable>
            <View style={styles.feedTabs}><Text style={styles.feedTabMuted}>Подписки</Text><View style={styles.activeFeedTab}><Text style={styles.feedTabActive}>Для вас</Text><View style={styles.underline} /></View></View>
            <Pressable style={styles.searchButton} onPress={() => setTab("discover")}><Ionicons name="search" size={23} color="#fff" /></Pressable>
          </SafeAreaView>
          <ScrollView pagingEnabled showsVerticalScrollIndicator={false} snapToInterval={height - 92} decelerationRate="fast">
            {clips.map((clip, index) => (
              <View key={clip.id} style={styles.clip}>
                <ImageBackground source={{ uri: clip.image }} resizeMode="cover" style={styles.clipImage}>
                  <LinearGradient colors={["rgba(5,5,12,0.08)", "transparent", "rgba(5,5,12,0.88)"]} locations={[0, 0.45, 1]} style={StyleSheet.absoluteFill} />
                  <View style={styles.rightActions}>
                    <View style={styles.avatarWrap}><ImageBackground source={{ uri: clip.avatar }} style={styles.avatar} imageStyle={{ borderRadius: 30 }} /><Pressable style={styles.followPlus} onPress={() => toggleFollow(clip.user)}><Ionicons name={following.includes(clip.user) ? "checkmark" : "add"} size={15} color="#fff" /></Pressable></View>
                    <Pressable style={styles.action} onPress={() => toggleLike(clip.id)}><Ionicons name={liked.includes(clip.id) ? "heart" : "heart-outline"} size={31} color={liked.includes(clip.id) ? "#ff4f91" : "#fff"} /><Text style={styles.actionLabel}>{clip.likes}</Text></Pressable>
                    <Pressable style={styles.action}><Ionicons name="chatbubble-ellipses" size={29} color="#fff" /><Text style={styles.actionLabel}>{clip.comments}</Text></Pressable>
                    <Pressable style={styles.action}><Ionicons name="bookmark" size={27} color="#fff" /><Text style={styles.actionLabel}>Сохранить</Text></Pressable>
                    <Pressable style={styles.action}><Ionicons name="share-social" size={27} color="#fff" /><Text style={styles.actionLabel}>Поделиться</Text></Pressable>
                  </View>
                  <View style={styles.clipInfo}>
                    <View style={styles.userLine}><Text style={styles.username}>{clip.user}</Text><View style={styles.creatorBadge}><Ionicons name="checkmark" size={10} color="#fff" /></View><Text style={styles.followersHint}> · автор</Text></View>
                    <Text style={styles.caption}>{clip.caption}</Text>
                    <View style={styles.soundLine}><Ionicons name="musical-notes" size={14} color="#fff" /><Text style={styles.soundText}>{clip.song}</Text></View>
                  </View>
                </ImageBackground>
              </View>
            ))}
          </ScrollView>
        </View>
      ) : (
        <SafeAreaView style={styles.placeholder} edges={["top"]}>
          <Text style={styles.pageEyebrow}>TIKTOK MOD</Text>
          <Text style={styles.pageTitle}>{({ discover: "Поиск", create: "Создать", inbox: "Входящие", profile: "Профиль" } as Record<string, string>)[tab]}</Text>
          <BlurView intensity={28} tint="dark" style={styles.glassCard}>
            <Ionicons name={({ discover: "compass-outline", create: "add-circle-outline", inbox: "chatbubbles-outline", profile: "person-circle-outline" } as Record<string, any>)[tab]} size={34} color="#c5a7ff" />
            <Text style={styles.cardTitle}>Это пространство уже готово</Text>
            <Text style={styles.cardText}>Следующим этапом подключим аккаунты, видео и настоящие социальные функции.</Text>
          </BlurView>
        </SafeAreaView>
      )}
      <BlurView intensity={48} tint="dark" style={styles.bottomNav}>
        {([
          ["home", "play-circle", "Главная"],
          ["discover", "search", "Интересное"],
          ["create", "add", "Создать"],
          ["inbox", "chatbubble-ellipses", "Входящие"],
          ["profile", "person", "Профиль"]
        ] as [Tab, string, string][]).map(([key, icon, label]) => (
          <Pressable key={key} style={styles.navItem} onPress={() => setTab(key)}>
            <View style={[styles.navIcon, tab === key && styles.navIconActive]}><Ionicons name={icon as any} size={key === "create" ? 25 : 22} color={tab === key ? "#fff" : "#aaa7ba"} /></View>
            <Text style={[styles.navLabel, tab === key && styles.navLabelActive]}>{label}</Text>
          </Pressable>
        ))}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#080811" },
  feed: { flex: 1 },
  topBar: { position: "absolute", zIndex: 5, top: 0, left: 0, right: 0, height: 82, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 18 },
  livePill: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "rgba(255,255,255,0.13)", borderRadius: 20, paddingHorizontal: 10, paddingVertical: 7 },
  liveDot: { width: 6, height: 6, borderRadius: 4, backgroundColor: "#ff4f91" },
  liveText: { color: "#fff", fontSize: 10, fontWeight: "800", letterSpacing: 1 },
  feedTabs: { flexDirection: "row", alignItems: "center", gap: 22 },
  feedTabMuted: { color: "rgba(255,255,255,0.65)", fontSize: 15, fontWeight: "600" },
  activeFeedTab: { alignItems: "center", gap: 7 },
  feedTabActive: { color: "#fff", fontSize: 16, fontWeight: "800" },
  underline: { width: 22, height: 3, borderRadius: 3, backgroundColor: "#c5a7ff" },
  searchButton: { width: 34, alignItems: "flex-end" },
  clip: { height: height - 92, width: "100%" },
  clipImage: { flex: 1, justifyContent: "flex-end" },
  rightActions: { position: "absolute", right: 13, bottom: 125, alignItems: "center", gap: 19 },
  avatarWrap: { marginBottom: 4 },
  avatar: { width: 48, height: 48, borderRadius: 30, borderWidth: 1.5, borderColor: "#fff", overflow: "hidden" },
  followPlus: { position: "absolute", bottom: -8, alignSelf: "center", backgroundColor: "#ff4f91", width: 20, height: 20, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  action: { alignItems: "center", gap: 4 },
  actionLabel: { color: "#fff", fontSize: 10, fontWeight: "700", textShadowColor: "#000", textShadowRadius: 5 },
  clipInfo: { paddingHorizontal: 18, paddingBottom: 112, maxWidth: "82%" },
  userLine: { flexDirection: "row", alignItems: "center", marginBottom: 9 },
  username: { color: "#fff", fontSize: 16, fontWeight: "800" },
  creatorBadge: { backgroundColor: "#8b5cf6", borderRadius: 7, width: 14, height: 14, alignItems: "center", justifyContent: "center", marginLeft: 6 },
  followersHint: { color: "rgba(255,255,255,0.65)", fontSize: 12 },
  caption: { color: "#fff", fontSize: 14, lineHeight: 20, marginBottom: 10 },
  soundLine: { flexDirection: "row", alignItems: "center", gap: 7 },
  soundText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  bottomNav: { position: "absolute", bottom: 0, left: 0, right: 0, height: 86, flexDirection: "row", justifyContent: "space-around", alignItems: "center", borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.1)", paddingBottom: 10, backgroundColor: "rgba(13,12,25,0.78)" },
  navItem: { flex: 1, alignItems: "center", justifyContent: "center", gap: 3 },
  navIcon: { width: 42, height: 30, alignItems: "center", justifyContent: "center", borderRadius: 15 },
  navIconActive: { backgroundColor: "rgba(155,115,255,0.22)" },
  navLabel: { color: "#8e8b9d", fontSize: 9, fontWeight: "600" },
  navLabelActive: { color: "#fff" },
  placeholder: { flex: 1, paddingHorizontal: 22, paddingTop: 28 },
  pageEyebrow: { color: "#b99aff", letterSpacing: 3, fontSize: 10, fontWeight: "800", marginBottom: 9 },
  pageTitle: { color: "#fff", fontSize: 34, fontWeight: "900", marginBottom: 25 },
  glassCard: { borderRadius: 25, padding: 24, overflow: "hidden", borderWidth: 1, borderColor: "rgba(255,255,255,0.14)", gap: 12, backgroundColor: "rgba(255,255,255,0.06)" },
  cardTitle: { color: "#fff", fontSize: 18, fontWeight: "800" },
  cardText: { color: "#b8b5c7", fontSize: 14, lineHeight: 21 }
});
