import { MessageType, MessageMap, SayMessage, AnyMessageMap, SenegalNotificationMessageMap, SenegalMobileMoneyMessageMap } from "../../../types_rn/TwilioTypes";
import { generateText } from "../../utils";


/* the deploy script will automatically fill in the urls for us */
const en_text: SenegalMobileMoneyMessageMap = {
  entrypoint: [
    //W1
    generateText("W1"),
    generateText("This is a voice notification from Orange. You’ve just received your quarterly Bourse Familiale payment. The amount is 25,000 francs. To get your money just go to the nearest Orange agent with your National ID Card and tell them the amount that you'd like to withdraw."),
  ],
  entrypoint_option: [
    //W2
    generateText("W2"),
    generateText("To hear the amount you’ve received again, press 1. To hear success stories from Bourse Familiale recipients that can teach you more about using your phone for mobile money, press 2"),
  ],
  amount_repeat: [
    //W3
    generateText("W3"),
    generateText("You received 25,000 francs."),

    //W4
    generateText("W4"),
    generateText("You can hang up to end this call, or stay on the phone to hear success stories from Bourse Familiale that can teach you more about using your phone for mobile money"),
  ],
  story_option: [
    //W5
    generateText("W5"),
    generateText(`To hear about when Aida forgot her code and learn what she did, press 1 on your phone keypad.
      To listen to Souleymane tell you about how he learned to send money to his daughter, press 2
      To listen to Yacine explain why she decided to only withdraw part of her Bourse payment money, press 3 `),
  ],
  story_1_intro: [
    //W8
    generateText("W8"),
    generateText("I'd just received money by Orange Money that I was really counting on, so I went to the Orange Money kiosk to get my money right away. I told the agent my phone number and the amount I wanted to withdraw and that's when it happened -- I did not know the code to get my money."),
  ],
  story_1_intro_option: [
    //W9
    generateText("W9"),
    generateText("To hear what the code is for, press 1 at any time on your phone. To hear what the agent told me, press 2."),
  ],
  story_1_pin_advice: [
    //W10
    generateText("W10"),
    generateText("You type your code to access your money. Never share it with people, keep it for yourself. Remember, you can call Orange customer care if you forget yours and want a new one."),
  ],
  story_1_pin_option: [
    //W11
    generateText("W11"),
    generateText("To hear the number for customer care, press 1. To hear what the agent told me when I forgot my code, press 2."),
  ],
  story_1_guess: [
    //M1
    generateText("M1"),
    generateText("Don't worry -- people forget their codes all the time. If you want a new code, call customer care and tell them you forgot your code. They'll help you."),
  ],
  story_1_guess_option: [
    //M2
    generateText("M2"),
    generateText("To hear the number for customer care, press 1. To hear what Aida did next, press 2."),
  ],
  story_1_customer: [
    //W12
    generateText("W12"),
    generateText("To speak with customer care, just dial 1444 and tell them you forgot your code."),
  ],
  story_1_customer_option_2: [
    //W13
    generateText("W13"),
    generateText("To hear what I did after the agent told me I could get a new code, press 1"),
  ],
  story_1_end: [
    //W14
    generateText("W14"),
    generateText("I asked the agent to tell me the customer care number. I called them and said I forgot my code. They asked me a few questions to make sure it wasn't someone pretending to be me, then the customer care officer reset my old code to 0000 and told me the number to dial to choose a new code. I dialed #144#7#, pressed 3 and then I chose a new code that I could easily remember. I went back to the Orange money kiosk and took out my money."),
  ],
  story_1_next: [
    //W6
    generateText("W6"),
    generateText("To hear the next story, just stay on the phone. Otherwise, you can hang up at any time"),
  ],
  story_2_intro: [
    //M3
    generateText("M3"),
    generateText("My daughter asked me to give her some money. She lives far away, so I had to use my phone to send it, but before I could send her anything I wanted to see if I had enough money in my Orange money account. I couldn’t remember how to do this, so I asked my son."),
  ],
  story_2_intro_option: [
    //M4
    generateText("M4"),
    generateText("To hear what my son told me about how to see the amount of money in my account, press 1 on your phone. To skip to what my son told me about how to send money to my daughter, press 2 on your phone."),
  ],
  story_2_explain: [
    //M8
    generateText("M8"),
    generateText("To see see how much money is in your account, you have to press a few numbers on your phone. I would recommend you write this down. Ready? You type # 144 # 1 #  After that you enter your secret code, and then press send."),
  ],
  story_2_explain_option: [
    //M9
    generateText("M9"),
    generateText("To hear what to do if you do not know your code, press 1 on your phone keypad. To hear what Souleymane did next, press 2 on your phone."),
  ],
  story_2_customer_care: [
    //M10
    generateText("M10"),
    generateText("If you don’t know your code, call customer care by dialing 1444 and tell them you forgot your code. They'll help you."),
  ],
  story_2_send_no_agent: [
    //M5
    generateText("M5"),
    generateText("After I checked to make sure I had enough money in my account, I had another question: how do I send money to my daughter directly without going to an agent?"),
  ],
  story_2_send_money: [
    //M11
    generateText("M11"),
    generateText("To hear what Souleymane did next, press 1 on your phone."),
  ],
  story_2_send_agent_option: [
    //M6
    generateText("M6"),
    generateText("To hear what my son told me for how to send money, press 1"),
  ],
  story_2_send_explain: [
    //M8
    generateText("M8"),
    generateText("To see see how much money is in your account, you have to press a few numbers on your phone. I would recommend you write this down. Ready? You type # 144 # 1 #  After that you enter your secret code, and then press send."),
  ],
  story_2_send_explain_option: [
    //M9 
    generateText("M9"),
    generateText("To hear what to do if you do not know your code, press 1 on your phone keypad. To hear what Souleymane did next, press 2 on your phone."),
  ],
  story_2_send_explain_2: [
    //M12
    generateText("M12"),
    generateText("To send money, you start by dialing this number. I would recommend you write this down. Ready? It is: #144#2#. Then you can just follow the steps that it tells you. "),
  ],
  story_2_send_explain_2_option: [
    //M13
    generateText("M13"),
    generateText("To hear what Souleymane did and whether it worked, press 1."),
  ],
  story_2_end: [
    //M7
    generateText("M7"),
    generateText("I dialed #144#2# like my son told me and then followed the steps that were given to me on my phone. After I was done my daughter called me to say thanks. She had received a notification on her phone that the money had arrived."),
  ],
  story_2_next: [
    //W6
    generateText("W6"),
    generateText("To hear the next story, just stay on the phone. Otherwise, you can hang up at any time."),
  ],
  story_3_intro: [
    //W15
    generateText("W15"),
    generateText("When I received my payment from the Bourse Familiale I was going to withdraw all of my money at once like I usually do. But I decided to only withdraw some of it this time. It was lucky that’s what I did. "),
  ],
  story_3_intro_option: [
    //W16
    generateText("W16"),
    generateText("To hear why I decided to not withdrew all of my money right away, press 1 on your phone. To hear why it was good that I didn’t withdraw all of my money, press 2 on your phone."),
  ],
  story_3_decision: [
    //W17
    generateText("W17"),
    generateText("I only needed some of the money that day and I knew that I could go back to the mobile money agent to withdraw more."),
  ],
  story_3_decision_option: [
    //W18
    generateText("W18"),
    generateText("To hear why it was good that I didn’t withdraw all of my money, press 1 on your phone."),
  ],
  story_3_end: [
    //W19
    generateText("W19"),
    generateText("The next day my cash was stolen. I was very upset, but luckily all of the money from my Bourse Familiale payment that I hadn’t withdrawn yet was still safe in my mobile money account. If I don’t need all of my money right away, leaving it in my mobile money account is a safe place for it."),
  ],

}

export default en_text;