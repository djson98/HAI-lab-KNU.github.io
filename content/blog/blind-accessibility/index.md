---
title: "Characterizing and Detecting Navigation Inefficiencies in Smartphone Screen Reader Use"
date: "2024-01-01"
description: "Screen readers on smartphones (e.g., TalkBack) enable people with visual impairments (PVIs) to navigate user interfaces (UIs) through sequential focus shifts, but this linear auditory structure can introduce inefficiencies and unnecessary navigation. This project investigated how PVIs actually explore and interact with smartphone UIs, with the goal of identifying structural mismatches between system-provided focus sequences and user intent. We developed an Android screen reader logger to capture PVIs-smartphone interaction and recruited 11 PVIs for a one-month in-the-wild study, complemented by semi-structured interviews. Analyses revealed three recurring inefficiency patterns: (1) unintentionally skipping initial focus targets, (2) traversing non-interactable UI elements, and (3) reversing navigation directions. Building on these findings, we designed algorithms that automatically detect these patterns in usage logs, providing a foundation for accessibility services that adapt focus ordering and offer context-aware shortcuts to reduce temporal and cognitive costs for screen reader users."
thumbnail: "/images/blind.jpg"

publications:
  - title: ""
    authors: ""
    venue: ""
    pdf: ""
    code: ""

sourcecode:
  - title: "TalkBack Logger"
    description: "Add Log Function from Unofficial FOSS-friendly fork of Google's TalkBack"
    github: "https://github.com/HAI-lab-KNU/talkback-Logger"
    language: "Java"
    framework: "Android"

people:
  - name: "Jungmin Lee"
    affiliation: "Kangwon National University"
    photo: "/images/members/jungmin-lee.png"
    homepage: "https://lsom5064.github.io/"
  - name: "Jiwoo Hwang"
    affiliation: "Kangwon National University"
    photo: "/images/members/jiwoo-hwang.jpeg"
    homepage: "https://hwang-jiwoo.github.io/"
  - name: "Auk Kim"
    affiliation: "Kangwon National University"
    photo: "/images/members/auk-kim.jpeg"
    homepage: "https://kimauk.github.io/"
tags: ["Accessibility", "Ubiquitous Computing"]
--- 