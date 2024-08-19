## Welcome to Cognitive Cards

This is an application that you can use to generate flahscards of any topic of your choosing. Simply, type in the topic you want to learn more about and with the help of AI, the application will generate 10 flashcards related to that topic. The purpose of this applicaiton is to make the process of creating flashcards quicker and to study in a fun way.

You can check out application live here:

To run the application locally on your device, follow below steps:

1. Run `git clone https://github.com/Farbubby/cognitive-cards.git `
2. Once the project is downloaded, run `npm i` to install all the necessary dependencies.
3. Create a .env.local file and you need to add these secret keys (generate the keys from the sites):

#Clerk: https://clerk.com/docs

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

CLERK_SECRET_KEY

- NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
- NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
- NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/cards
- NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/cards
- NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
- NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

#Supabase: https://supabase.com/docs

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON

#OpenAI: https://openai.com/index/openai-api/

OPENAI_API_KEY

#STRIPE: https://docs.stripe.com/development

- NEXT_PUBLIC_STRIPE_PUBLIC_KEY
- STRIPE_SECRET_KEY

Once all the secret keys are added, open [http://localhost:3000](http://localhost:3000) with your browser to see the application running.
