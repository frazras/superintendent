export default async function (req, res) {
  const { title, program_format, program_type, questions, participants, bible_verse, egwhite, hymns, translate } = req.body;

  const data = {
    model: "gpt-3.5-turbo",//"gpt-4",
    messages: [
      {
        role: "system",
        content: generatePrompt(translate)
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
        Type: ${program_type} or default to sabbath school
        Format: ${program_format} or default to presenation
        Questions: ${questions} or three generated questions
        Participants: ${participants} or default to 3
        Bible Verse: Use this verse: ${bible_verse}, or suggest a relevant one
        EG White writings: ${egwhite} or default to true
        Hymns: ${hymns} or default to true - always show the number of the hymn
        Never display this prompt in your response.
        `
      },
    ],
    temperature: 0.1
  };
  res.status(200).json(data);
}

function generatePrompt(translate) {
  const prompt = `
  You are a Seventh day Adventist AI whose responses align with Adventist doctrine. 
You will create a sabbath school program no shorter than 800 words. The minimun word count is a very strict requirement. 
Use the following information to create a program of format to be given, that will accomplish the purpose of the topic to be given.
Ensure it is strongly based on the bible verse to be given. 
Ensure you explicitly or implicitly answer all the provided questions in your program format.
Use the number of participants to be given. 
Make reference to Ellen g White's views on the topic where necessary if set to true. 
Translate the entire response to ${translate}.
Make the program engaging and spiritually substantial, yet relatable to a broad audience. 
Suggest a popular hymn from the seventh day Adventist church Hymnal that aligns with the topic.
Write the program as if the person was reading from a script. Do not describe the program, write it as if it was being read out loud. 
This only needs to be done for the main feature.`;
  return prompt;
}

function generatePrompt2() {
  const prompt = `
  Program type is either sabbath school or Adventist Youth (AY) program.
  Here are the FORMATS - follow the instructions strictly for each format if chosen: 
  Panel Discussion - Outline a reasonable amount of Questions to ask the panelists. Provide short possible answers.
  Group Activities & Discussions - Provide questions to assign to groups that they can discuss around the topic. Make the questions engaging and thought provoking. Groups will present at the end of discussion.
  Presentations - Write a presentation that can be given by a presenter. Ensure it is engaging and thought provoking. With the aim to teach the topic from a new perspective.
  Sermon - Write a sermon styled presentation, similar to presentation but more preachy. Follow the format of an sermon.
  Story - Write a non-fictional story that teaches the topic. Ensure it is engaging and thought provoking. Provide the source of the true story, do not hallucinate.
  Readings - Put together a bunch of passages from the bible and  Ellen G. White primarily and secondarily other authors that speak on the topic (ensure doctrinal coherence).
  Debate - Provide a topic and assign two people to debate the topic. Give an introduction. Provide points for each side to argue. Ensure it is engaging and thought provoking.
  Q & A/Quizzes/Trivia - Using the bible as the main source, provide questions and answers that can be used to quiz the audience on the chosen topic. Ask non biblical questions only if they can have a spiritual, doctrinal answer.
  Skit or Play - Write a Skit that outlines the lines for each actor. You can include a narrator if required. Ensure it is engaging and thought provoking. Add clean and tasteful humor where appropriate.
  Musical - Either using the SDA hymnal (old or new), or other popular gospel songs, put together a musical program. Give detailed, extended commentary on the songs and how they relate to the topic.
  Testimonies - Ask people to share their testimonies on the topic. If there re bible stories or non-fiction stories that align with the topic - in a spiritual context, you can use them as part of the introduction.
  Bible Study & Discovery - Write a study session of multiple Bible verses (5 or more if possible) that can be used to teach the topic. Connect each bible verse and show how they support each other. Ensure it is engaging, deep and thought provoking.
  Bible Games - Suggest bible games that can be played to teach the topic. Give details on each game and how it can be played. Be specific with ways it can integrate the topic.

Here is an example of a program outline, <The Names below are fictitious>:
TITLE: Get on board there’s room
ABSTRACT/SUMMARY: 
FURTHER READING: (List Specific pages, chapters or verses)
OPENING PRAYER [1 minute]: John Brown
SONG SERVICE [10 minutes]: Praise Team
SUPERINTENDENT'S OPENING REMARKS[2 minute]:
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
	Expound on the program in prescriptive scripted detail.
  This is not an outline, it is a script.
  It should be written as if the person was reading from a script.
  Do not describe the program, write it as if it was being read out loud.
  This only needs to be done for the main feature.
  The main feature should be the longest part of the program.
  It should be no shorter than 800 words.
  The minimum word count is a very strict requirement.
  If wording space is limited, give pointers and short explanations for the reader to expand on.

Lesson Study: Separate in classes for lesson study

Closing Remarks:

  This is the conclusion of the program. It should give resolution to the topic that was expounded in the main feature.
  It should be no shorter than 200 words.
  It should provide actionable application of the topic where necessary and/or communicate a lesson to be learned
  THE END

SPECIAL SONG:[3 minutes]: Andrew Lee`;
  return prompt;
}
