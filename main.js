// ขอสิทธิ์แจ้งเตือนเมื่อโหลดหน้าเว็บ
if (Notification.permission !== "granted") {
  Notification.requestPermission();
}

let alarmTime = null;

function setReminder() {
  const timeInput = document.getElementById("timePicker").value;
  if (!timeInput) {
    alert("กรุณาเลือกเวลาก่อน!");
    return;
  }

  alarmTime = timeInput;
  document.getElementById("status").textContent = "ตั้งเตือนไว้ที่เวลา " + alarmTime;
}

// ตรวจสอบเวลาทุกๆ 1 วินาที
setInterval(() => {
  if (!alarmTime) return;

  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5); // HH:MM

  if (currentTime === alarmTime) {
    notifyWithSound();
    alarmTime = null; // เตือนครั้งเดียว
    document.getElementById("status").textContent = "แจ้งเตือนแล้ว";
  }
}, 1000);

function notifyWithSound() {
  const audio = document.getElementById("alarm");
  audio.play().catch(err => console.log("เล่นเสียงไม่ได้:", err));

  if (Notification.permission === "granted") {
    new Notification("⏰ ถึงเวลากินยาแล้ว!");
  } else {
    alert("⏰ ถึงเวลากินยาแล้ว!");
  }

  if ("vibrate" in navigator) {
    navigator.vibrate([200, 100, 200]);
  }
}
