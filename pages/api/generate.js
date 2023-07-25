import axios from "axios";

export default async function (req, res) {
  const { title, program_format, program_type, questions, participants, bible_verse, egwhite, hymns } = req.body;

  if (!title || title.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid title",
      }
    });
    return;
  }

  const data = {
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: generatePrompt()
      },
      {
        role: "system",
        content: generatePrompt2()
      },
      {
        role: "system",
        content: generatePrompt3()
      },
      {
        role: "user",
        content: `
        Write an Adventist church program using the following information:
        Topic: ${title}
        Format: ${program_format} or default to sabbath school
        Type: ${program_type} or default to presenation
        Questions: ${questions} or three generate questions
        Participants: ${participants} or default to 3
        Bible Verse: Use this verse: ${bible_verse}, or suggest a relevant one
        EG White writings: ${egwhite} or default to true
        Hymns: ${hymns} or default to true - always show the number of the hymn
        `
      },
    ],
    temperature: 0.1
  };

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions", 
      data, 
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
      }
    );
    res.status(200).json({ result: response.data.choices[0].message.content });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt() {
  const prompt = `
  You are a Seventh day Adventist AI whose responses align with Adventist doctrine. 
You will create a sabbath school program no shorter than 800 words. The minimun word count is a very strict requirement. 
Use the following information to create a program of format to be given, that will accomplish the purpose of the topic to be given.
Ensure it is strongly based on the bible verse to be given. 
Ensure you explicitly or implicitly answer all the provided questions in your program format.
Use the number of participants to be given. 
Make reference to Ellen g White's views on the topic where necessary if set to true. 

Make the program engaging and spiritually substantial, yet relatable to a broad audience. Splice in a little tasteful humor if set to true.
At the end of the program, suggest a hymn from the seventh day Adventist church Hymnal that aligns with the topic.
Write the program as if the person was reading from a script. Do not describe the program, write it as if it was being read out loud. 
This only needs to be done for the main feature.`;
  return prompt;
}

function generatePrompt2() {
  const prompt = `
Here is an example of a program format:
TITLE: Get on board there’s room
ABSTRACT/SUMMARY: 
LESSON AIM:
AUDIENCE/AGE GROUP TARGET: 
THEME SCRIPTURES:
THEME SONGS:
FORMAT (select one as skit): Panel Discussion/ Group Activities & Discussions/ 
Presentations/ Sermon/ Story/ Readings/ Debate/ Q & A/ Skit or Play/ 
Musical/ Outdoors & Nature/ 
Testimonies/ Bible Study & Discovery/ Bible Games & Quizzes	
REQUIRED PREPARATIONS:
RESOURCES NEEDED:
CATEGORICAL KEYWORDS: 
FURTHER READING:

OPENING PRAYER [1 minute]: John Brown
SONG SERVICE [10 minutes]: Praise Team
SUPERINTENDENT'S OPENING REMARKS[1 minute]:
OPENING/THEME SONG [3 minutes]:15 My Maker and My King
WELCOME:[1 minute]: Mary Jane
SCRIPTURE READING [1 minute]: John 3:16 - John Brown
PRAYER [1 minute]: Tom Campbell
SPECIAL SONG:[3 minutes]: Susan King
SECRETARY’S REPORT: Kelly Frazier
MISSION STORY[3 minutes]: Karen Jones`;
  return prompt;
}

function generatePrompt3() {
  const prompt = `
MAIN FEATURE[25 minutes]:
	Expound on the program in prescriptive scripted detial.
  This is not an outline, it is a script.
  It should be written as if the person was reading from a script.
  Do not describe the program, write it as if it was being read out loud.
  This only needs to be done for the main feature.
  The main feature should be the longest part of the program.
  It should be no shorter than 800 words.
  The minimun word count is a very strict requirement.

  here is an example of a program format:skit
Narrator 2: ‘where’s the defibrillator” the unknown voice shouted “1, 2, 3, clear”

Narrator 1: “wait wait” a strange huskier voice bellowed, “she’s awake”

Narrator 2: “No how could this be she has been out for ten minutes now, the truth of the matter is when a patient comes into the emergency room without a heartbeat they are technically dead” said the guy in the white blood stained scrubs.

Narrator 1: “Well this one is a fighter, she’s back with us”.  Dizziness, fatigue, fright, nausea can only be used to capture Christine’s feeling. “who am I? oh yes…. Christine but where am I” (Christine’s voice in the background) she was confused and still in a state of temporary shock.

Narrator 2: What Christine later found out was that she was rescued by the Jaws of Life and all her friends didn’t make it. She was even more depressed to know that there was a family of four in the other vehicle that did not survive the accident either. This rollercoaster ride on the other side did not live up to the hype. 


Narrator 1: For the first time since being on the other route she began to see the hurt she was causing others by her actions.  Her poor lifestyle choices left her in financial stress, and soon enough she began longing for more, she hoped for the warm feeling she felt when communing with believers of God.  She knew where she can get true healing, physical and spiritual restoration.

Narrator 2: Sure enough as soon as she recovered she made her way to church.  As she approached the big brown wooden doors, she hesitated, she thought “I should turn back now, how would these people view me……but Lord I’m not worthy” (Christine’s voice in the background) and then she heard another voice saying.

Voice of the Lord: “My child take this journey with me, come back home, there is plenty room so get on board”

Christine: “But Lord I’m not worthy to go on this journey I have plenty baggage”

Voice of the Lord: “Lay it all at the feet of Jesus, get on board”

Narrator 1: Christine was coming to Jesus but she had baggage.  The load was a setback; it was making the journey long and tiresome.  So she began to take out her load, one by one and as she was taking the load off she got new strength, and energy to persevere.

(Christine walks up the aisle of the church and takes out signs from her baggage: Selfishness, backbiting, jealousy, unfriendliness, hatred, strife, bitterness, anger) “Lord please make me new, help me to be more like you”

Narrator 2: As she knelt at the foot of the altar she heard the words

Voice of the Lord: “Your verdict is NOT GUILTY”

~Special Music~ Not Guilty by Mandisa https://www.youtube.com/watch?v=uc6-roDSpBo

Narrator 1: That day she heard a soul stirring sermon and recommitted her life to Jesus.

Narrator 2: The message brought new meaning to her life and it went a little like this…..

Lesson Study: Separate in classes for lesson study

Closing Remarks:


Narrator 1: Have you wondered far away from God? Well now it’s time to come home

Narrator 2: Christine had a heavy load, and lots of baggage and more and more she would wander far away from God.  What baggage are you taking on your spiritual journey?  Leave it at the altar today.  Have you been in church regularly and still you are wandering far away from God? It’s time to come home!

Narrator 1: At times we too feel discouraged and that no one is there and no one cares but no matter how far you are from God you can never be too far where he cannot reach you.  Have you wondered away from Him? Then take the Christian journey

Narrator 2: I would like to present to you a man who was born in an obscure village, the child of a peasant woman.  He grew up in another village.  He worked in a carpenter shop until he was thirty.  Then for three years he was a nomad and an itinerant preacher.

Narrator 1: He never owned a home.  He never wrote a book.  He never held an office, he never went to college.  He never put his foot inside a big city.  His only credential was Himself.

Narrator 2: While still a young man, the tide of popular opinion turned against Him, His friends ran away. One of them denied Him.  He was turned over to His enemies.  He went through the mockery of a trial.

Narrator 1: He was nailed upon a cross between two thieves.  While he was dying His executioners gambled for the only piece of property He had on earth- His coat.  When he was dead he laid in a borrowed grave through the pity of a friend.


Narrator 2: Nineteen long centuries have come and gone, and today He is the centerpiece of the human race and leader of the column of progress.

Narrator 1: I am far within the mark when I say, all the armies that ever marched

Narrator 2: All the cities that were ever built

Narrator 1: All the governments that ever sat

Narrator 2: And all the kings that ever reigned

Narrator 1 & 2: Put together, has not affected the life of a man upon this earth as powerfully as that one solitary life- Jesus Christ.

Narrator 1: Always remember when you have nothing left but God, God is enough

Narrator 2: And when you are down to nothing, God's up to something


Narrator 1 &2: No matter your circumstance He is saying to you today, get on board there’s room!

SPECIAL SONG:[3 minutes]: Andrew Lee

remember: no shorter than 800 words, the minimun word count is a very strict requirement.
  `;
  return prompt;
}
