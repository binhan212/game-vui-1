// ============================================================
// TYPING TROLL — Data Layer
// Sentences loaded from js/sentences/ — this file combines them
// and holds feedbacks, tips, and reminders.
// ============================================================

// Troll sentences — combined from per-category files
const trollSentences = [
  ...trollCrush,
  ...trollNgheo,
  ...trollDeadline,
  ...trollMe,
  ...trollMxh,
  ...trollHoctap,
  ...trollDaily,
  ...trollTrietly,
];

// Healing sentences — combined from per-category files
const healingSentences = [
  ...healingYeuthuong,
  ...healingTruongthanh,
  ...healingCuocsong,
  ...healingDongluc,
];

// === FEEDBACKS ===

const trollFeedbacks = [
  "Gõ nhanh vậy? Crush chắc rep không kịp đâu 😏",
  "Nhanh hơn anh shipper giao hàng luôn 🏃",
  "Bàn phím đang kêu cứu kìa! 🆘",
  "Tốc độ này đi thi đánh máy được rồi đấy 🏆",
  "Flex tí: bạn gõ nhanh hơn 67% người chơi (mình bịa) 📊",
  "Ngón tay bạn có bảo hiểm chưa? Gõ dữ vậy! 🔥",
  "Skill thật hay copy paste vậy? 🤔",
  "Tay nhanh hơn não nghĩ kìa! Bình tĩnh! 🧠",
  "Gõ nhanh vậy mà sao rep crush chậm thế? 💔",
  "Nhanh quá! Hay là bot vậy? 🤖",
  "Bàn phím muốn xin nghỉ phép rồi đấy! ⌨️",
  "Mẹ thấy bạn gõ nhanh vầy chắc tưởng đang cãi nhau online 😂",
  "Tốc độ gõ: PRO. Tốc độ suy nghĩ: ...không bình luận 🤡",
  "Không sai một chữ? Bạn có phải robot không? 🦾",
  "Oke phù thủy bàn phím, tôi nể! 🧙",
];

const trollFeedbacksSlow = [
  "Bình tĩnh thôi, deadline còn xa mà... à hết rồi 😅",
  "Chậm rãi như con rùa nhưng rùa thắng thỏ mà! 🐢",
  "Gõ chậm vậy đợi crush rep nhanh hơn đấy 😂",
  "Oke oke, speed không phải tất cả... nhưng cũng quan trọng 💀",
  "Bạn đang gõ hay đang ngắm bàn phím vậy? 👀",
];

const healingFeedbacks = [
  "Giỏi lắm! 💛 Nhớ nhé: mỗi ngày là một khởi đầu mới",
  "Tuyệt vời! Và nhớ: cho đi là nhận lại 💛",
  "Đẹp lắm! Hãy mỉm cười, bạn xứng đáng 🌸",
  "Pro ghê! Nhưng nhớ nghỉ ngơi nha, sức khỏe là số một 💪",
  "Nhanh thật! Nhưng sống chậm lại đôi khi cũng đẹp 🌿",
  "Gõ xong rồi nhớ: hôm nay bạn đã rất cố gắng 🌟",
  "Hay lắm! Mỗi nỗ lực nhỏ đều có ý nghĩa 💛",
  "Bạn giỏi hơn bạn nghĩ đấy! Tin mình đi 🤗",
  "Perfect! Nhớ nhé: kiên nhẫn là chìa khóa 🔑",
  "Wow! Và nhớ: bạn không đơn độc đâu 💛",
];

const resultFeedbacks = {
  legendary: {
    troll: "HUYỀN THOẠI! Bàn phím khóc thét, ngón tay bốc khói! 🔥🔥🔥",
    healing: "Bạn thật sự phi thường! Nhớ nhé: tài năng + lòng tốt = vô đối 💛",
  },
  pro: {
    troll: "PRO VL! Mời bạn vào team esport gõ phím! ⌨️🏆",
    healing: "Xuất sắc! Và nhớ: hành trình vạn dặm bắt đầu từ bước đầu tiên 🌟",
  },
  good: {
    troll: "Khá lắm! Từ giờ bạn được phong là 'Chiến binh bàn phím' 💼",
    healing: "Tốt lắm! Mỗi ngày tiến bộ một chút là đã rất giỏi rồi 💪",
  },
  average: {
    troll: "Tạm ổn! Nhanh hơn crush rep tin nhắn rồi đấy 📱😂",
    healing: "Không sao! Chậm mà chắc, đời ai cũng có lúc cần thời gian 🌱",
  },
  slow: {
    troll: "Bạn gõ bằng... một ngón à? 🦶 Kidding! Lần sau sẽ nhanh hơn!",
    healing: "Đừng lo! Mọi chuyên gia đều từng là người mới bắt đầu, cứ tiếp tục nhé 💛",
  },
};

const loadingTips = [
  { text: "Gõ nhanh không bằng gõ đúng, nhưng gõ nhanh VÀ đúng thì... 🤯", type: "troll" },
  { text: "Mỗi phím bạn gõ là một bước tiến, dù nhỏ 💛", type: "healing" },
  { text: "Fun fact: người gõ nhanh nhất thế giới đạt 216 WPM. Bạn thì... 🤡", type: "troll" },
  { text: "Hít thở sâu, thả lỏng vai, rồi gõ thôi 🧘", type: "healing" },
  { text: "Bàn phím không phán xét bạn đâu. Nhưng tôi thì có 🤡", type: "troll" },
  { text: "Hãy tử tế với bản thân như cách bạn tử tế với người khác 💛", type: "healing" },
  { text: "Chuẩn bị tinh thần: sắp cười lăn lộn rồi bất ngờ thấm 🎭", type: "troll" },
  { text: "Hãy mỉm cười, vì cuộc đời đẹp hơn khi bạn cười 🌸", type: "healing" },
];

const idleMessages = [
  "Alo? Bạn ngủ à? Keyboard đang nhớ bạn 😴",
  "Gõ đi, đừng ngại! Bàn phím không cắn đâu 🐶",
  "Sao im vậy? WiFi mất hay hết cảm hứng? 📡",
];

const wellbeingReminders = [
  "Chơi vui vậy? Nhớ uống nước nhé! 💧",
  "5 round rồi! Giãn cơ tay chút nha 🤸",
  "Nhớ chớp mắt nha, mắt bạn cần nghỉ 👁️",
];
