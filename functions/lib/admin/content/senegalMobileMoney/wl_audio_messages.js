"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
/* the deploy script will automatically fill in the urls for us */
const en_text = {
    entrypoint: [
        utils_1.generateText("I'd just received a mobile money payment that I was really counting on, so I went to the mobile money agent to get my money right away."),
        utils_1.generateText("I told the agent my phone number and the amount I wanted to withdraw and that's when it happened -- I did not know the code to get my money."),
    ],
    story_1_intro_option: [
        utils_1.generateText("To hear what the code, which is also called a PIN, is for, press 1 at any time"),
        utils_1.generateText("To hear what the agent told me, press 2"),
    ],
    story_1_pin_advice: [
        utils_1.generateText("1__ Aida: You type your PIN to access your money. Remember, you can call Orange if you forget yours and want a new one but that can take time - it’s better to remember it. Only share your pin with people you share money with.")
    ],
    story_1_pin_option: [
        utils_1.generateText("To hear the number for customer care, press 1"),
        utils_1.generateText("To hear what the agent told me when I forgot my PIN, press 2"),
    ],
    story_1_guess: [
        utils_1.generateText("2__ Agent (male voice): Don't worry -- people forget their PINs all the time. Let me see if I can guess yours. What is your birthday? Aha, that was it. If you want to change your pin, call customer care and tell them you forgot your PIN. They'll help you."),
    ],
    story_1_guess_option: [
        utils_1.generateText("To hear the number for customer care, press 1"),
        utils_1.generateText("To hear what Aida did next, press 2"),
    ],
    story_1_customer: [
        utils_1.generateText("1__Aida: To speak with customer care, just dial #1441 and tell them you forgot your PIN"),
    ],
    story_1_customer_option_2: [
        utils_1.generateText("To hear what I did next, press 2"),
    ],
    story_1_end: [
        utils_1.generateText("2__Aida: I asked the agent to tell me the customer care number. I called them and said I forgot my PIN. They asked me a few questions to make sure it wasn't someone pretending to me, and then I chose a new PIN that I could easily remember. I went back to the mobile money agent and took out my money."),
    ],
    story_1_next: [
        utils_1.generateText("To hear the next story, just stay on the line. Otherwise, you can hang up at any time."),
    ],
    story_2_intro: [
        utils_1.generateText("Chidi (man’s voice): My daughter asked me to give her some money. She lives far away, so I had to use my phone, but before I could send her anything I wanted to see if I had enough money in my account. I couldn’t remember how to do this, so I asked my son."),
    ],
    story_2_intro_option: [
        utils_1.generateText(">To hear what my son told me about how to see the amount of money in my account, press 1 on your phone at any time."),
        utils_1.generateText("To hear what my son told me about how to send money to my daughter, press 2 on your phone."),
    ],
    story_2_explain: [
        utils_1.generateText("Son: To see see how much money is in your account, you have to press a few numbers on your keypad. I would recommend you write this down. Ready? You type # 144 # 1 * After that you enter your secret mobile money code, which is also called a PIN, and then press # again."),
    ],
    story_2_explain_option: [
        utils_1.generateText("To hear what to do if you do not know your PIN, press 1 on your phone keypad at any time"),
        utils_1.generateText("To hear how Chidi sent money to his daughter, press 2 on your phone."),
    ],
    story_2_customer_care: [
        utils_1.generateText("Son: If you don’t know your pin, call customer care by dialing #1441 and tell them you forgot your PIN. They'll help you."),
    ],
    story_2_send_no_agent: [
        utils_1.generateText("Chidi: I entered the number my son told me and was now sure that I had enough money in my account. Then I had another question: how do I send money to my daughter directly without going to an agent?"),
    ],
    story_2_send_agent_option: [
        utils_1.generateText(">To hear what Chidi’s son told him for how to send money, press 1"),
    ],
    story_2_send_explain: [
        utils_1.generateText("Son: To send money, you start by dialing this number. You might want to write it down. Ready? It is: #155#. Then you can just follow the steps that it tells you."),
    ],
    story_2_send_explain_option: [
        utils_1.generateText("To hear the steps for sending money, press 1."),
        utils_1.generateText("To hear what I did and whether it worked, press 2"),
    ],
    story_2_send_explain_2: [
        utils_1.generateText("Son: The first step is to select the option to transfer money, next you enter the phone number of the person you want to send money to. Then you enter the amount of money you want to send and press 1 to confirm that it’s the right amount. Finally you enter your secret code, which is also called your PIN."),
    ],
    story_2_end: [
        utils_1.generateText("Chidi: I dialed #155# like my son told me and then followed the steps that were given to me on my phone. After I was done my daughter called me to say thanks. She had received a notification on her phone that the money had arrived."),
    ],
    story_2_next: [
        utils_1.generateText("To hear the next story, just stay on the line. Otherwise, you can hang up at any time."),
    ],
    story_3_intro: [
        utils_1.generateText("When I received my payment from the Bourse Familiale I was going to withdraw all of my money at once like I usually do. But I decided to only withdraw some of it this time. It was lucky that’s what I did."),
    ],
    story_3_intro_option: [
        utils_1.generateText("To hear why I decided to not withdrew all of my money right away, press 1 on your phone keypad at any time."),
        utils_1.generateText("To hear why it was good that I didn’t withdraw all of my money, press 2 on your phone keypad at any time."),
    ],
    story_3_decision: [
        utils_1.generateText("I only needed some of the money that day and I knew that I could go back to the mobile money agent to withdraw more."),
    ],
    story_3_decision_option: [
        utils_1.generateText("To hear why it was good that I didn’t withdraw all of my money, press 1 on your phone keypad at any time."),
    ],
    story_3_end: [
        utils_1.generateText("The next day my cash was stolen. I was very upset, but luckily all of the money from my Bourse Familiale payment that I hadn’t withdrawn yet was still safe in my mobile money account. When I went back to the Mobile Money agent I again decided to not take out all of it at once. If I don’t need all of my money right away, leaving it in my mobile money account is a safe place for it."),
    ],
};
exports.default = en_text;
//# sourceMappingURL=wl_audio_messages.js.map