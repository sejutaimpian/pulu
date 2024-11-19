document.addEventListener("alpine:init", () => {
  Alpine.data("puluGenerator", () => ({
    sentence: "",
    histories: Alpine.$persist([]),

    clear() {
      if (!this.sentence) {
        const event = new CustomEvent("notify", {
          detail: {
            variant: "info",
            title: "Inputan kosong!",
            message: "Apa yang mau dibersihkan kalau kosong!",
          },
        });
        return window.dispatchEvent(event);
      }

      this.sentence = "";
      const event = new CustomEvent("notify", {
        detail: {
          variant: "success",
          title: "Berhasil dibersihkan!",
          message: "Inputan telah dibersihkan!",
        },
      });
      return window.dispatchEvent(event);
    },
    copy(data) {
      navigator.clipboard.writeText(data).then(() => {
        const event = new CustomEvent("notify", {
          detail: {
            variant: "success",
            title: "Success!",
            message: "Berhasil menyalin teks!",
          },
        });
        window.dispatchEvent(event);
      });
    },
    deleteHistory(index) {
      if (confirm("Apakah anda yakin ingin menghapus kalimat ini?")) {
        this.histories.splice(index, 1);
        const event = new CustomEvent("notify", {
          detail: {
            variant: "success",
            title: "Berhasil dihapus!",
            message: "Kalimat telah dihapus!",
          },
        });
        return window.dispatchEvent(event);
      }
    },
    generate() {
      if (!this.sentence) {
        const event = new CustomEvent("notify", {
          detail: {
            variant: "danger",
            title: "Inputan kosong!",
            message: "Mohon masukkan kalimat!",
          },
        });
        return window.dispatchEvent(event);
      }

      const generatedSentence = generatePulu(this.sentence);
      this.histories.push({
        sentence: this.sentence,
        pulu: generatedSentence,
        isPulu: true,
      });
      // scroll to bottom
      this.sentence = "";
    },
  }));
});

function generatePulu(sentence) {
  const words = sentence.split(" ");
  let result = [];
  for (const word of words) {
    const wordPulu = generateWordPulu(word);
    result.push(wordPulu);
  }
  return result.join(" ");
}

function generateWordPulu(word) {
  let wordOnlyLetter = "";
  let exceptLetters = [];
  for (let i = 0; i < word.length; i++) {
    if (isLetter(word[i])) {
      wordOnlyLetter += word[i];
    } else {
      exceptLetters.push({
        index: i,
        char: word[i],
      });
    }
  }

  word = wordOnlyLetter;

  const wordLength = word.length;
  if (wordLength === 1) {
    wordOptions = ["p", "u", "l"];
    word = wordOptions[Math.floor(Math.random() * wordOptions.length)];

    isUpperCase = Math.random() >= 0.5;
    if (isUpperCase) {
      word = word.toUpperCase();
    }
  } else if (wordLength === 2) {
    wordOptions = ["pu", "lu"];
    word = wordOptions[Math.floor(Math.random() * wordOptions.length)];

    word = randomizeCase(word);
  } else if (wordLength === 3) {
    wordOptions = ["pul"];
    word = wordOptions[Math.floor(Math.random() * wordOptions.length)];

    word = randomizeCase(word);
  } else if (wordLength === 4) {
    wordOptions = ["pulu"];
    word = wordOptions[Math.floor(Math.random() * wordOptions.length)];

    word = randomizeCase(word);
  } else if (wordLength < 8) {
    wordOptions = ["pulu"];
    word = wordOptions[Math.floor(Math.random() * wordOptions.length)];

    let gapLength = wordLength - 4;
    let index0 = 1;
    let index1 = 1;
    let index2 = 1;
    let index3 = 1;
    const pulu = "pulu";
    let result = "";

    while (gapLength > 0) {
      const targetIndexLetter = Math.floor(Math.random() * pulu.length);
      if (targetIndexLetter === 0) {
        index0 += 1;
      } else if (targetIndexLetter === 1) {
        index1 += 1;
      } else if (targetIndexLetter === 2) {
        index2 += 1;
      } else if (targetIndexLetter === 3) {
        index3 += 1;
      } else {
        console.log("Error logic in incremetLetterMethod 1");
      }
      gapLength -= 1;
    }
    for (let i = 0; i < pulu.length; i++) {
      if (i === 0) {
        letter = "p".repeat(index0);
        result += randomizeCase(letter);
      } else if (i === 1) {
        letter = "u".repeat(index1);
        result += randomizeCase(letter);
      } else if (i === 2) {
        letter = "l".repeat(index2);
        result += randomizeCase(letter);
      } else if (i === 3) {
        letter = "u".repeat(index3);
        result += randomizeCase(letter);
      } else {
        console.log("Error logic in incremetLetterMethod 2");
      }
    }
    word = result;
  } else if (wordLength >= 8) {
    wordOptions = ["pulupulu"];
    word = wordOptions[Math.floor(Math.random() * wordOptions.length)];

    let gapLength = wordLength - 8;
    let index0 = 1;
    let index1 = 1;
    let index2 = 1;
    let index3 = 1;
    let index4 = 1;
    let index5 = 1;
    let index6 = 1;
    let index7 = 1;
    const pulu = "pulupulu";
    let result = "";

    while (gapLength > 0) {
      const targetIndexLetter = Math.floor(Math.random() * pulu.length);
      if (targetIndexLetter === 0) {
        index0 += 1;
      } else if (targetIndexLetter === 1) {
        index1 += 1;
      } else if (targetIndexLetter === 2) {
        index2 += 1;
      } else if (targetIndexLetter === 3) {
        index3 += 1;
      } else if (targetIndexLetter === 4) {
        index4 += 1;
      } else if (targetIndexLetter === 5) {
        index5 += 1;
      } else if (targetIndexLetter === 6) {
        index6 += 1;
      } else if (targetIndexLetter === 7) {
        index7 += 1;
      } else {
        console.log("Error logic in incremetLetterMethod 1");
      }
      gapLength -= 1;
    }
    for (let i = 0; i < pulu.length; i++) {
      if (i === 0 || i === 4) {
        letter = "p".repeat(index0);
        result += randomizeCase(letter);
      } else if (i === 1 || i === 5) {
        letter = "u".repeat(index1);
        result += randomizeCase(letter);
      } else if (i === 2 || i === 6) {
        letter = "l".repeat(index2);
        result += randomizeCase(letter);
      } else if (i === 3 || i === 7) {
        letter = "u".repeat(index3);
        result += randomizeCase(letter);
      } else {
        console.log("Error logic in incremetLetterMethod 2");
      }
    }
    word = result;
  }

  word = word.split("");
  exceptLetters.forEach((el) => {
    word.splice(el.index, 0, el.char);
  });
  return word.join("");
}
function randomizeCase(word) {
  let result = "";
  for (const char of word) {
    const isUpperCase = Math.random() >= 0.5;
    if (isUpperCase) {
      result += char.toUpperCase();
    } else {
      result += char.toLowerCase();
    }
  }
  return result;
}
function isLetter(char) {
  const regex = /^[a-zA-Z]$/;
  return regex.test(char);
}
