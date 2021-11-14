# Whether

In order to reflect the 'Zen' theme of KnightHacks 2021, our team wanted to help ease the minds of students commuting between classes. When it comes to scheduling, most apps on the market don't account for precipitation. We're 

Avoid moist socks by using Whether to decide when to go!

We decided to make this app because of these frustrations with the rain, realizing that the best way to combat it was to have a way of seeing weather information with as little barriers of entry as possible. Instead of having to cross-reference weather data with what you remember your class times to be, you can simply take some time in the beginning to set your classes up, and then be stress free from then on.

## What it does

Especially in Florida, weather is a scheduling factor that can make or break your day.
No one likes showing up to appointments wet, and even the best umbrella can only do so much.

By merging the functionality of a scheduler and live weather, students should be able to better plan their commutes, ensuring a dry arrival.

## Inspiration

Over the last few weeks, all of us have gotten stressed out because of the sporadic rain patterns. Especially since one of our members is wheelchair bound, being caught in the rain in between classes and failing to plan ahead can make for a rough time moving around and being stress-free overall.

## How we built it

We created a mockup through Figma, detailing the extents of our scope as well as the overall structure of the app through its use. We used React.js with Expo to create a streamlined developer environment for ourselves. We wrote entirely in Typescript, using SQLite as our back-end to store user schedules. We also interacted with the OpenWeather API to get information about the rain chance to display to users. We worked together remotely throught VSCode's LiveShare features, as well.

## Challenges we ran into

Our original idea was to store commute time data that we would get using Google's API, but as that turned out to be against the TOS, we had to figure out a way to represent our travel distances using a reasonable scale.
With limited team experience in the technologies used as well as a short deadline, we had to remain flexible in terms of milestone management.

## Accomplishments that we're proud of

We all put a huge amount of time into the app. At points, we had team members coding for 19+ hours straight (with some necessary breaks.)

## What we learned

We learned that even a seemingly-limited scope can still be delayed by massive hangups on seemingly simple things. We also learned that everything changes when you use a language you are unfamiliar with. Simple things we could do in an instant in Java became downright impossible when we had to do them in React.

## What's next for Whether App

Because of the infeasibility/legal questions of generating the walk/transit time in between buildings, we chose to estimate the walk time between any two buildings as 10min. Although this probably serves our purpose, there is room for improved granularity.

## Built with

* [TypeScript](https://www.typescriptlang.org/)
* [React-Native](https://reactnative.dev/)
* [Figma](https://figma.com/)
* [Open Weather API](https://openweathermap.org/api)

## Authors

* **Amelia Castilla** - [github.com/AccraZed](https://github.com/AccraZed)
* **Layne Hoelscher** - [github.com/layyne](https://github.com/layyne)
* **Kate Fort** - [github.com/katefort](https://github.com/katefort)
* **Justice Smith** - [github.com/jcode94](https://github.com/jcode94)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
