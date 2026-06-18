import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

const toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

export function showToast(title, icon = "success") {
  return toast.fire({
    icon,
    title,
  });
}

export function showAuthRequiredAlert() {
  return Swal.fire({
    icon: "info",
    title: "Account required",
    text: "Sign up or log in first. Your URL will be saved for this session and filled in after login.",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Sign Up",
    denyButtonText: "Login",
    cancelButtonText: "Cancel",
  });
}

export function showLoginSuccessAlert(message) {
  return Swal.fire({
    icon: "success",
    title: "Welcome back",
    text: message || "You are signed in. You can create a short link now.",
    showCancelButton: true,
    confirmButtonText: "Create Link",
    cancelButtonText: "Continue",
  });
}

export function showCreatedLinkAlert({ shortUrl, destinationUrl }) {
  return Swal.fire({
    icon: "success",
    title: "Your short link is ready",
    html: `
      <div style="text-align:left">
        <p style="margin:0 0 8px;font-weight:700;text-transform:uppercase;font-size:12px;letter-spacing:.12em;opacity:.65">Short URL</p>
        <p style="margin:0 0 18px;word-break:break-all;font-weight:800">${escapeHtml(shortUrl)}</p>
        <p style="margin:0 0 8px;font-weight:700;text-transform:uppercase;font-size:12px;letter-spacing:.12em;opacity:.65">Destination</p>
        <p style="margin:0;word-break:break-all;font-size:14px;opacity:.8">${escapeHtml(destinationUrl)}</p>
      </div>
    `,
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Copy Link",
    denyButtonText: "View Dashboard",
    cancelButtonText: "Close",
  });
}
