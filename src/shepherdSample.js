import Shepherd from "shepherd.js";
import "shepherd.js/dist/css/shepherd-theme-dark.css";

let tour = new Shepherd.Tour({
  defaultStepOptions: {
    showCancelLink: true
  }
});

tour.addStep("description", {
  title: "Todoリスト",
  text: `
    これはShepherdを試してみたサンプルです
    <br>
    Todoリストのガイドをしていきます
  `,
  buttons: [
    {
      text: "次へ",
      action: tour.next
    }
  ]
});

tour.addStep("todo add", {
  text: "新しくTodoを追加することができます",
  attachTo: ".guide-add-todo bottom",
  buttons: [
    {
      text: "戻る",
      action: tour.back
    },
    {
      text: "次へ",
      action: tour.next
    }
  ]
});

tour.addStep("todo tab", {
  text: "タブ切り替えでTodoの完了状態ごとに表示することができます",
  attachTo: ".guide-tab bottom",
  buttons: [
    {
      text: "戻る",
      action: tour.back
    },
    {
      text: "次へ",
      action: tour.next
    }
  ]
});

tour.addStep("todo check", {
  text: "チェックをつけることでTodoを完了にできます",
  attachTo: ".guid-check right",
  buttons: [
    {
      text: "戻る",
      action: tour.back
    },
    {
      text: "次へ",
      action: tour.next
    }
  ]
});

tour.addStep("todo delete", {
  text: "Todoを削除することができます",
  attachTo: ".guid-delete left",
  buttons: [
    {
      text: "戻る",
      action: tour.back
    },
    {
      text: "次へ",
      action: tour.next
    }
  ]
});

tour.addStep("guid complete", {
  title: "ガイドは完了しました",
  text: "さあ、Todoリストを使い始めましょう!",
  buttons: [
    {
      text: "完了",
      action: tour.complete
    }
  ]
});

tour.start();

document.querySelector(".start").addEventListener("click", e => {
  e.preventDefault();
  tour.start();
});
