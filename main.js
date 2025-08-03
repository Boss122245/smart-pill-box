let reminderTime = null;

function setReminder() {
  const inputTime = document.getElementById("pillTime").value;
  const status = document.getElementById("status");

  if (!inputTime) {
    status.textContent = "กรุณาเลือกเวลา";
    return;
  }

  reminderTime = inputTime;
  status.textContent = `ระบบจะเตือนเวลา ${reminderTime}`;
}

function checkReminder() {
  if (!reminderTime) return;

  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5); // "HH:MM"

  if (currentTime === reminderTime) {
    notifyUser();
    reminderTime = null; // เตือนครั้งเดียว
  }
}

function notifyUser() {
  const audio = document.getElementById("alertSound");
  audio.play().catch((err) => console.warn("เล่นเสียงไม่ได้:", err));

  if (Notification.permission === "granted") {
    new Notification("ถึงเวลาทานยาแล้ว!");
  } else {
    alert("ถึงเวลาทานยาแล้ว!");
  }
}

setInterval(checkReminder, 1000); // ตรวจทุก 1 วินาที
