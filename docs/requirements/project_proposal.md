# ENGR 301 Project "Dungeons and Dragons Realm render" Project Proposal and Requirements Document
#### Author list
- Alexander Urlich, Leonard Holmes, Matthew Holdaway, William Kho, Nathan Kaffes, Nathan Collinson

## 1. Introduction

Dungeons and Dragons (D&D) is a teamwork-based fantasy game played on a tabletop. In the game, participants take on the roles of adventurers who explore an imaginative fantasy realm, engaging in quests, fights, and earning rewards. One participant acts as the Game Master (GM) and oversees the game, controlling non-player characters (NPCs) and telling the story.

The game happens on a detailed map, where players interact with NPCs and with each other. Enemies, often in the form of monsters, have attributes such as hit points that determine how interactions and battles play out.

D&D includes all sorts of maps and dungeons. These challenging places offer big rewards for successful exploration, and the challenges get harder as players go deeper. Players can't see everything that the GM can, which creates uncertainty, strategic decisions, and exciting outcomes.

### Client

**Craig Watterson**  
Victoria University of Wellington, Cotton Building, Room 253  
**Phone:** +64 4 886 5333  
**Email:** craig.watterson@vuw.ac.nz  

### 1.1 Purpose

To create a D&D map generator that can generate psuedo random maps with specified themes. The generated map should be editable by the user and saveable. It should have a player view which has modifiable fog of war settings aswell as a GM view where you can control a real time game. Can be printed out or played collaboratively on multiple devices.

### 1.2 Scope

#### The Map Generation of the Program should meet the Following Goals
- There should be a semi-random map generated.
- Map should have one specifiable theme.
- Map structure should be logical and sensible.
- The enemy types, item types, and map story should be consistent with the theme.
- The location for entities should be consistent with map theme.
- Maps should be saveable and loadable with the current game state.

#### The Map Editor Screen of the Program should meet the Following Goals
- Map should be resizable and functional on all devices.
- The user should be able to print the map on standard sized paper.
- The user should be able to edit the map precisely.
  
#### The Game Master Map Controller of the Program should meet the Following Goals
- The screen should be able to display all tiles and entities.
- GM should be able to control the zoom level
- GM should be able to modify fog of war for the players

### 1.3 Product overview
#### 1.3.1 Product perspective

This system generates maps to be used for a DND game. The primary feature of our product is that it allows the user to generate and edit their own adventure fantasy map that doesn't neccesarily need to be for a DND game. Our secondary feature is the user's ability to host their own DND game from their device that allows for a dynamically updated map as the game progresses.

The program will generate a randomized map with enemies and items according to the theme, and GM settings. The player view will have the players information which can be modified by the player or the GM, based off of the game settings. There will be a space to store damage done to enemies and players.

We have taken inspiration from party games such as Jackbox [1] and Kahoot. In these games, players join a host using a room code. In our game, the GM is the host, and players join using their devices. The GM will have control over the map, entities, and player fog of war. This provides the GM exclusive control over the game and an immersive experience for players who can see their character on the map in real time.

#### 1.3.2 Product functions

##### 1.3.2.1 Minimum Viable Product

MVP: D&D Battle Map Generator
The Minimum Viable Product (MVP) for the D&D Battle Map Generator is a software solution focused on creating dynamic battle maps tailored for Dungeons and Dragons gameplay.

Key Features
Random Battle Map Generation: The software generates random battle maps suitable for D&D games.

Customizable Themes: Maps can be generated with various themes to suit different campaign settings and scenarios.

Grid System: The maps feature a grid system, essential for tactical movement and positioning of characters and objects.

Terrain Variety: The maps offer a diverse array of terrains such as forests, dungeons, plains, and more.

Spawn Points: The software provides options for placing enemy and player spawn points to initiate encounters.

GM and Player Views: The GM view allows map editing, while the player view reveals map sections as players explore.

Printable Format: The generated battle maps are printable, facilitating physical gameplay scenarios.

By delivering these core features, the MVP serves as a functional D&D Battle Map Generator, enabling GMs and players to enjoy dynamic and versatile battles within the Dungeons and Dragons universe.

##### 1.3.2.2 Dungeon Generation

- **Entry and Exit**  The generated level must have an entry and exit point. These must be connected through a sensible layout.

- **Monster Population**  The generated map must be auto populated with monsters that are level and theme appropriate.

- **Item Population**  The generated map must be auto populated with items that are level and theme appropriate.

- **Room sizing**  Rooms are expected to be appropriately sized for the monsters that populate them. A room with a large monster should have entrances that allow the movement of that large monster based on size.

- **Game Scale**  Levels have a scale that ties them to distance in feet.

##### 1.3.2.3 Game Master View

- **Full Map**  The game master is able to see the map in it's entirety.

- **Monster Stats**  The game master is able to see the monster stats of monsters inside the level.
  
- **Item Stats**  The game master is able to see the item stats of items inside the level.

- **Player Stats**  The game master is able to see the players stats of players inside the level.

##### 1.3.2.4 Player View

- **Display**  The players are able to see the sections of the map that are not covered in fog (as controlled by the GM)

- **View control** The players can see where their player is (and has been, and other players have been) based on fog of war settings. They will be able to zoom in and out.

#### 1.3.3 User characteristics   

The client, Craig Watterson, wants the system for his personal use. So, the main focus is on tailoring the system to match his characteristics, which are assumed to be similar to a typical user.

One important trait of the client is that they know how Dungeons and Dragons works. Because of this, the system is designed with the idea that users already understand how D&D and other tabletop role-playing games function. This means the system is meant to simplify and make the game mechanics, information, and actions easier to manage. It's aimed at experienced players who know the game well, and it will work more like a toolkit for Game Masters than a guide.

Even though the system is for experienced D&D players, it aims to be user-friendly. This comes from the client's goal of making game maps quickly without overwhelming players with complicated features. Since there aren't many widely-used D&D map generators, the system will use familiar designs and features that most people know, while also adding useful and intuitive tools to make the Game Master's job simpler.

The client wants the system to be online, accessible through web browsers on various devices.

The system will include entity stats. However, player tiles and statistics won't be printed. They can be printed separately for personal use, just like items and monsters. The "fog of war" feature won't be printed either, as it wouldn't work well on a physical board.

#### 1.3.4 Limitations

##### 1.3.4.1 Software Limitations
* A modern web browser will be needed to display the application to the GM and users.

* Use of copyright material is (under any circumstances) not permitted.

##### 1.3.4.2 Hardware Limitations
* An internet connection will be required to use the program. A loss of internet connection will mean the website is not accessible.

##### 1.3.4.3 Usage Assumptions

* It will be assumed that the devices will be used in the same room, or all on video call. Any User experience features involving the display of information, crucial for online play, will not be implemented.

* The GM will be using this to assist with, and aid their campaign, and they will not be relying on it for the story, story-telling and improvisation aspects will be left to the GM & players.

## 2. References

[1] [Jackbox](https://www.jackboxgames.com/what-is-jackbox/)

## 3. Specific requirements  

### 3.1 External interfaces

#### 3.1.1 Game Master's View

The game master must be able to see a different view from the players. The game master's view must be controllable by the game master and must include features such as changing the player's view and viewing enemy statistics. This view includes displaying individual rooms as well as the dungeon as a whole.

#### 3.1.2 Player's View

The player's view must display what the game master chooses to display. This means that the player's view interface and the game master interface must be connected so that the game master can change the display for the players.

### 3.2.1 Generate Maps

**Goal of the Use Case**  
Create a map of tiles for the Dungeons and Dragons tabletop & digital game.

**Beneficiaries of the Outcome**  
The game master benefits by reducing map creation time. An automatic tool generates dungeons for them.

**Approach to Achieve the Use Case**  
Algorithm to generate a map with the specified parameters

**Verification of the Requirement**  
A sensical map is generated that fulfils the users criteria

**Limitations to Achieving the Use Case**  
- Maps will be in battle map form, not artistically drawn.
- Possibility of generating similar maps if using duplicate prefabs.

---

### 3.2.2 Edit Maps

**Goal of the Use Case**  
Allow the user to precisely edit pre-generated maps.

**Beneficiaries of the Outcome**  
User can customise a map to their specific liking.

**Approach to Achieve the Use Case**  
Map editor screen that the user can use to edit their map precisely

**Verification of the Requirement**  
When the map editor has full control over all elements of the map

**Limitations to Achieving the Use Case**  
- Predefined set of monsters and items required.
- Screen needed for data display.

---

### 3.2.3 View Player Maps

**Goal of the Use Case**  
Enable players to view their map while Game Master uses "Change Visibility."

**Beneficiaries of the Outcome**  
Players get unspoiled experiences. GMs edit before player encounters.

**Approach to Achieve the Use Case**  
Create a netcode interaction that allows the GM to change the player's displayed map.

**Verification of the Requirement**  
Player ability to view the map. GM ability to update the map

**Limitations to Achieving the Use Case**  
Dependent on 3.2.3 fog of war settings.
Complex problem of writing net code.

---

### 3.2.7 Pick Map Theme and Level

**Goal of the Use Case**  
Generate thematically consistent maps for storytelling.

**Beneficiaries of the Outcome**  
GM and players benefit. Storytelling becomes immersive.

**Approach to Achieve the Use Case**  
...

**Verification of the Requirement**  
...

**Limitations to Achieving the Use Case**  
- Dependent on Game Master assignment.
- Relies on implemented features.

---

### 3.2.8 Populate Map

**Goal of the Use Case**  
Semi-randomly populate maps with themed monsters and items.

**Beneficiaries of the Outcome**  
Both players and GMs benefit. Streamlined gameplay.

**Approach to Achieve the Use Case**  
...

**Verification of the Requirement**  
...

**Limitations to Achieving the Use Case**  
...

---

### 3.2.10 Choose View (GM Or Player)

**Goal of the Use Case**  
Allow users to choose between GM and player views.

**Beneficiaries of the Outcome**  
Users decide their responsibilities during the game.

**Approach to Achieve the Use Case**  
...

**Verification of the Requirement**  
...

**Limitations to Achieving the Use Case**  
...

---

### 3.2.11 Save Game (GM)

**Goal of the Use Case**  
Enable GM to store the generated map for later use.

**Beneficiaries of the Outcome**  
Both GM and players benefit. Save progress for unfinished games.

**Approach to Achieve the Use Case**  
...

**Verification of the Requirement**  
...

**Limitations to Achieving the Use Case**  
...

---

### 3.2.12 Load Game (GM)

**Goal of the Use Case**  
Allow GM to load a previously saved game.

**Beneficiaries of the Outcome**  
Both GM and players benefit. Resume from where they left off.

**Approach to Achieve the Use Case**  
...

**Verification of the Requirement**  
...

**Limitations to Achieving the Use Case**  
...

---

### 3.3 Usability Requirements

To develop a completely operational Dungeons and Dragons tabletop and digital environment, it is necessary to fulfill the subsequent usability prerequisites:

Measurable effectiveness of the software: The software must function at the intended level without encountering failures.
Efficiency of the software: The software should effectively handle user-inputted functions without any inefficiencies.
Satisfaction criteria specified by the client: The software should accurately embody the functions desired by the client.

**Effectiveness:**
*The application should be able to generate battle maps without errors or crashes.
*The battle maps generated should accurately reflect the selected themes and terrains.
*The grid system should align properly with the map layout, allowing for precise movement and positioning.
*Spawn points for both enemies and players should be correctly placed on the map.
*Monsters and Items should only spawn in logical locations

**Efficiency:**
*The map generation process should not take an unreasonably long time.
*The software should be responsive to user input, with minimal delays when customizing themes, terrains, and other settings.
*The grid system should be quick to update when changes are made to the map layout.

**Satisfaction Criteria:**
*The battle maps should be visually appealing and match the intended themes and terrains.
*Users should find it intuitive to customize map themes, terrains, and other settings.
*The grid system should be easy to understand and use for precise character and object movement.
*Users should be able to easily place spawn points and make adjustments as needed.
*Both GM and player views should provide a clear and engaging representation of the battle map.
*The printed battle maps should have clear graphics and be formatted properly for physical gameplay scenarios.

### 3.4 Performance requirements


### 3.5 Logical database requirements

#### 3.5.1 Overview domain model
%Model here%



### 3.6 Design constraints

#### Copyright And Legal Constraints
The ownership of Dungeons and Dragons rests with Wizards Of The Coast, under a copyright and/or licensing arrangement that covers all their game-related assets. It is imperative that we uphold their terms and conditions concerning these assets to prevent any breach. This encompasses materials such as monster details/names, images, game elements, and any other content integrated into the game.

For any additional assets employed in this project, whether acquired freely or through payment, they will be accompanied by terms of use. It is essential that we strictly follow these stipulations to sidestep potential legal complications.

#### Data and Privacy
The program will not collect or store any personal data to avoid privacy laws.

#### Time limitation
Approximately 15 hours per week are allocated for working on this project, with a strict deadline set before the exam period concludes to complete the project. Due to this time limitation, there's no assurance that any tasks beyond what's outlined in this requirements document can be finished before the deadline.


### 3.8 Physical and Environmental Requirements



### 3.9 Supporting information

No supporting information provided.

## 4. Verification

### 4.1 Generating Maps

**Verification Approach:**  
Evaluate randomly generated maps to ensure diversity and complexity align with campaign settings and scenarios.

### 4.2 Viewing Player Maps

**Verification Approach:**  
Confirm players accurately view assigned maps without discrepancies.

### 4.3 Changing Visibility

**Verification Approach:**  
Test by playthrough: Validate immediate and accurate updates in visibility for players upon Game Master's tile selection.

### 4.4 Viewing Data

**Verification Approach:**  
Check if map-generated monsters' stats are visible, aiding Game Master's calculation during encounters.

### 4.5 Viewing Full Maps

**Verification Approach:**  
Test map generation and display for full map visibility after program execution.

### 4.6 Choosing Map Theme

**Verification Approach:**  
Confirm alignment of generated monsters and their genre with chosen map theme.

### 4.7 Populating Maps

**Verification Approach:**  
Check if "generate monsters" and "generate items" populate dungeon with appropriate monsters.

### 4.8 Exiting Game

**Verification Approach:**  
Manual test: Verify no persistent display or application after exit, and monitor resource usage.

### 4.9 Choosing View

**Verification Approach:**  
Ensure view selection results in intended display (Player view or GM view).

### 4.10 Saving Game

**Verification Approach:**  
Test save function by confirming parser file accurately represents room layouts, monsters, entrance/exit rooms, and themes.

### 4.11 Loading Game

**Verification Approach:**  
Verify saved game by comparing reloaded state with original saved data.

## 5. Development schedule.



### 5.3 Risks

## 5.3 Project Risks

| #   | Risk                                                  | Risk Type                       | Likelihood | Severity  |
| --- | ----------------------------------------------------- | ------------------------------- | ---------- | --------- |
| 1   | Impact on Access to Laboratories and Equipment        | Performance                     | High       | Tolerable |
| 2   | Compatibility Issues with Services or Equipment       | Availability / Performance      | Medium     | Severe    |
| 3   | Scope Creep Leading to Minimum Requirement Challenges | Operational                     | Medium     | Extreme   |
| 4   | Team Member Availability                              | Health and Safety / Performance | Medium     | Extreme   |
| 5   | Customer Sickness                                     | Health and Safety / Strategic   | Low        | Moderate  |
| 6   | Customer-Requested Requirement Alterations            | Strategic                       | Low        | Tolerable |
| 7   | Alignment of Products with Stakeholder Expectations   | Strategic                       | Medium     | Tolerable |
| 8   | Communication Gaps Among Team and Stakeholders        | Performance                     | Low        | Severe    |
| 9   | Functional Impact Due to Undetected Bugs              | Operational                     | Low        | Tolerable |
| 10  | Insufficient Team Skillset                            | Performance                     | Low        | Tolerable |
| 11  | Interpersonal Conflict                                | Team Dynamics                   | Medium     | High      |
| 12  | Underperforming Team Member                           | Team Dynamics / Performance     | Medium     | High      |
| 13  | Deviations from Established Procedures                | Operational                     | Low        | Severe    |
| 14  | Faulty Hardware                                       | Technical                       | Low        | Severe    |
| 15  | Group Member Drops Out                                | Team Dynamics                   | Low        | Extreme   |
| 16  | GitLab Disruption                                     | Technical                       | Low        | Severe    |
| 17  | Misuse of Version Control                             | Security                        | Low        | Extreme   |

## Mitigation Strategies:

| #   | Risk                                                  | Mitigation Strategy                                                                                                                               |
| --- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Impact on Access to Laboratories and Equipment        | Maintain active use of online resources for communication and productivity until access to laboratories and equipment is restored.                |
| 2   | Compatibility Issues with Services or Equipment       | Research and prepare alternative services and equipment options in case of incompatibility or unavailability.                                     |
| 3   | Scope Creep Leading to Minimum Requirement Challenges | Focus on fulfilling minimum requirements before considering any additional features, potentially reallocating resources.                          |
| 4   | Team Member Availability                              | Distribute absent members' tasks evenly among the remaining team to maintain workflow and prevent overload.                                       |
| 5   | Customer Sickness                                     | If the client is sick, reschedule meetings or discussions as needed, and consider adjusting project timelines if necessary.                       |
| 6   | Customer-Requested Requirement Alterations            | If new requirements are not feasible within the remaining timeframe, consider declining or negotiating them with the client.                      |
| 7   | Alignment of Products with Stakeholder Expectations   | Hold regular client meetings to ensure features align with specifications, enhancing clarity and preventing misunderstandings.                    |
| 8   | Communication Gaps Among Team and Stakeholders        | Conduct frequent team meetings and utilize communication platforms to ensure everyone is informed and on track.                                   |
| 9   | Functional Impact Due to Undetected Bugs              | Implement testing procedures for each function to identify and address bugs before proceeding to new tasks.                                       |
| 10  | Insufficient Team Skillset                            | Organize skill-building sessions led by knowledgeable team members to elevate everyone's expertise and contribution.                              |
| 11  | Interpersonal Conflict                                | Address conflicts openly and encourage a positive team environment. Establish effective communication channels to resolve disputes.               |
| 12  | Underperforming Team Member                           | Identify areas of underperformance early and provide additional support, guidance, or reassignment of tasks as needed.                            |
| 13  | Deviations from Established Procedures                | Enforce adherence to established procedures and provide training to prevent deviation.                                                            |
| 14  | Faulty Hardware                                       | Have backup hardware available and establish protocols for addressing technical failures swiftly.                                                 |
| 15  | Group Member Drops Out                                | Develop contingency plans and allocate tasks to remaining team members to mitigate the impact of a dropout.                                       |
| 16  | GitLab Disruption                                     | Regularly back up code and collaborate via alternative platforms in case of GitLab disruptions.                                                   |
| 17  | Misuse of Version Control                             | Implement strict access controls, code review practices, and regular training to prevent unauthorized or improper use of version control systems. |


### 5.4 Health and Safety

## Health and Safety

1. **Working Hours and Stress Management:**

   - **Long Working Days and Stress:** To mitigate the risk of long working hours and stress, the project team will adhere to a well-defined schedule with reasonable working hours. Regular breaks and time for relaxation will be encouraged to prevent burnout and excessive stress.

2. **External Workplace/Site:**

   - The project does not require any work or testing to be conducted at an external workplace or site. All project-related activities will be carried out within a controlled and safe environment.

3. **User Experience Testing with Students:**

   - In the event that students are involved in user experience testing, the project team will ensure ethical and legal considerations are met. Consent forms will be prepared and provided to the participating students or their legal guardians if applicable. This ensures that all participants are aware of the nature of their involvement and provide their informed consent.


# 7 Quality Assurance and Control Document

## 7.1. Introduction

This document outlines the quality assurance and control practices to be followed throughout the development of the project. The aim is to ensure the delivery of a high-quality and DND map generator that meets the specified requirements.

## 7.2. Linting

### 7.2.1 Purpose

Linting is a critical practice that ensures consistent code formatting and adherence to coding standards. It helps maintain code readability and reduces the likelihood of errors.

### 7.2.2 Approach

- A linting tool will be integrated into the development environment to analyze code for formatting and style issues.
- Linting rules and configurations will be defined in a shared configuration file to ensure uniformity across the codebase.
- Developers will be required to run the linting tool before submitting code for review.

## 7.3. Unit Testing

### 7.3.1 Purpose

Unit testing verifies the correctness of individual code units, ensuring that they function as intended in isolation.

### 7.3.2 Approach

- Developers will write unit tests for each functional unit of code, covering different scenarios and edge cases.
- A testing framework (e.g., Jest, NUnit) will be used to automate the execution of unit tests.
- Unit tests will be integrated into the CI/CD pipeline to ensure that new code changes do not break existing functionality.

## 7.4. Pipeline

### 7.4.1 Purpose

The pipeline ensures automated building, testing, and deployment of code changes. It enables continuous integration and delivery, enhancing code quality and project efficiency.

### 7.4.2 Approach

- A Continuous Integration (CI) pipeline will be established using a CI/CD platform (e.g., Jenkins, GitLab CI/CD).
- The pipeline will be configured to:
  - Build the codebase upon each commit.
  - Run automated tests, including unit tests and integration tests.
  - Perform code quality checks, such as linting and code coverage analysis.
  - Deploy the application to staging environments for further testing.
  - Deploy to production upon successful testing in staging environments.

## 7.5. Review Strategy

### 7.5.1 Purpose

The review strategy ensures thorough and comprehensive code reviews before changes are merged into the main branch. This helps identify issues early and maintain code quality.

### 7.5.2 Approach

- **Pre-Review Preparation:**
  - Developers will complete their tasks and ensure that code is properly documented and adheres to coding standards.
  - The linting tool will be run to fix any formatting or style issues.
  - Unit tests will be written to cover new code changes.

- **Comprehensive Code Reviews:**
  - Before pushing code changes to the main branch, developers will create merge requests (MRs) that include detailed descriptions of their changes.
  - The MRs will be assigned to designated reviewers, who will conduct comprehensive reviews.
  - Reviewers will assess code quality, logic, adherence to requirements, and potential risks.
  - Automated testing results, including test coverage reports, will be analyzed to identify areas of concern.

- **Feedback and Iteration:**
  - Reviewers will provide constructive feedback and request necessary changes.
  - Developers will address the feedback, update the code, and engage in discussions if needed.
  - Code revisions will be pushed to the PR, triggering automated testing and another round of review if necessary.

- **Merge to Main:**
  - Once the code is approved by reviewers and passes all automated tests, it will be merged into the main branch.

## 7.6. Conclusion

This Quality Assurance and Control Document outlines the linting, unit testing, pipeline, and review strategy practices to ensure the development of a high-quality software solution. Following these practices will contribute to the reliability, maintainability, and overall success of the project.

---

*Last Updated: 17/08/2023*

Group B Development Team


## 8. Contributions

| User             | Sections Done |
| ---------------- | :-----------: |
| Alexander Urlich |               |
| Leonard Holmes   |               |
| Matthew Holdaway |               |
| William Kho      |               |
| Nathan Kaffes    |               |
| Nathan Collinson |               |