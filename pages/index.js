import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [title, setTitle] = useState("");
  const [programFormat, setProgramFormat] = useState("");
  const [programType, setProgramType] = useState("");
  const [questions, setQuestions] = useState("");
  const [participants, setParticipants] = useState("");
  const [bibleVerse, setBibleVerse] = useState("");
  const [egwhite, setEgwhite] = useState(false);
  const [hymns, setHymns] = useState(false);
  const [result, setResult] = useState();
  const [buttonText, setButtonText] = useState("Generate Program");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setIsButtonDisabled(true);
    let counter = 60;
    setButtonText(`Wait ${counter} seconds`);

    const interval = setInterval(() => {
      counter--;
      setButtonText(`Wait ${counter} seconds`);
      if (counter === 0) {
        clearInterval(interval);
        setButtonText("Generate Program");
        setIsButtonDisabled(false);
      }
    }, 1000);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          title,
          program_format: programFormat,
          program_type: programType,
          questions,
          participants,
          bible_verse: bibleVerse,
          egwhite,
          hymns
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setTitle("");
      setProgramFormat("");
      setProgramType("");
      setQuestions("");
      setParticipants("");
      setBibleVerse("");
      setEgwhite(false);
      setHymns(false);
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Superintendent Church Program Idea Generator</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Superintendent</h3>
        <h4>Church Program Generator</h4>
        <form onSubmit={onSubmit}>
        <input
            type="text"
            name="title"
            placeholder="Enter a Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
         <select
            name="program_format"
            value={programFormat}
            onChange={(e) => setProgramFormat(e.target.value)}
          >
            <option value="">Select a Program Format.</option>
            <option value="Panel Discussion">Panel Discussion</option>
            <option value="Group Activities & Discussions">Group Activities & Discussions</option>
            <option value="Presentations">Presentations</option>
            <option value="Sermon">Sermon</option>
            <option value="Story">Story</option>
            <option value="Readings">Readings</option>
            <option value="Debate">Debate</option>
            <option value="Q & A">Q & A</option>
            <option value="Skit or Play">Skit or Play</option>
            <option value="Musical">Musical</option>
            <option value="Outdoors & Nature">Outdoors & Nature</option>
            <option value="Testimonies">Testimonies</option>
            <option value="Bible Study & Discovery">Bible Study & Discovery</option>
            <option value="Bible Games & Quizzes">Bible Games & Quizzes</option>
          </select>

          <select
            name="program_type"
            value={programType}
            onChange={(e) => setProgramType(e.target.value)}
          >
            <option value="">Select a Program Type</option>
            <option value="sabbath school">Sabbath School</option>
            <option value="AY">AY</option>
          </select>
          <textarea
            name="questions"
            placeholder="Enter Questions"
            value={questions}
            onChange={(e) => setQuestions(e.target.value)}
          />
          <input
            type="number"
            name="participants"
            min="1"
            max="8"
            placeholder="Enter Participants"
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
          />
          <input
            type="text"
            name="bible_verse"
            placeholder="Enter a Bible Verse"
            value={bibleVerse}
            onChange={(e) => setBibleVerse(e.target.value)}
          />
          <label>
            <input
              type="checkbox"
              name="egwhite"
              checked={egwhite}
              onChange={(e) => setEgwhite(e.target.checked)}
            />
            EG White
          </label>
          <label>
            <input
              type="checkbox"
              name="hymns"
              checked={hymns}
              onChange={(e) => setHymns(e.target.checked)}
            />
            Hymns
          </label>
          <input type="submit" value={buttonText} disabled={isButtonDisabled} />
        </form>
        <pre className={styles.result}>{result}</pre>
      </main>
    </div>
  );
}
