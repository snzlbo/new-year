export type Language = "EN" | "JP";

export interface TranslationContent {
  title: string;
  subtitle: string;
  nameLabel: string;
  namePlaceholder: string;
  wishText: string;
  submitButton: string;
  successMessage: string;
  successThankYou: string;
  toastSuccess: string;
  toastError: string;
}

export const translations: Record<string, TranslationContent> = {
  EN: {
    title: "Happy New Year",
    subtitle: "DDAM ALL 🎉",
    nameLabel: "Name",
    namePlaceholder: "Enter your name",
    wishText: "Wish big, from the heart! ❤️",
    submitButton: "Submit",
    successMessage: "Form sent!",
    successThankYou: "Thanks a bunch! 🎉",
    toastSuccess: "Successfully sent!",
    toastError: "Please enter your name!"
  },
  JP: {
    title: "新年明けましておめでとう",
    subtitle: "DDAM ALL 🎉",
    nameLabel: "名前",
    namePlaceholder: "お名前を入力してください",
    wishText: "心を込めて、大きな願いを ❤️",
    submitButton: "送信",
    successMessage: "フォームが送信されました！",
    successThankYou: "ありがとうございます！🎉 ",
    toastSuccess: "送信が成功しました。",
    toastError: "お名前を入力してください。"
  }
};
