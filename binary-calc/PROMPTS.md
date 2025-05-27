# AI Tool Prompts for Binary Calculator

## Claude AI

### Initial Prompt
```
Create a binary calculator web application using Next.js. The calculator should:
1. Allow input of two binary numbers
2. Support operations: addition, subtraction, multiplication, and division
3. Validate that inputs are valid binary numbers (only 0s and 1s)
4. Display the result in binary
5. Handle errors appropriately (like division by zero)
6. Have a clean, user-friendly interface using Tailwind CSS
```

### Design Improvement Prompt
```
Enhance the binary calculator UI using Tailwind CSS with:
1. A responsive layout that works well on mobile and desktop
2. Clear visual hierarchy with appropriate spacing
3. Proper error message styling
4. Accessible input fields with labels
5. Distinctive buttons for calculation and clearing
6. A well-formatted result display
```

### Animation and Interaction Enhancement Prompt
```
Can you make the very very vest design, UI/UX like so appealing to the point everyone will get their attention, and also make animations and transitions if possible as well sounds.

Add the following features:
1. Smooth animations using Framer Motion for all UI elements
2. Theme switcher with multiple color themes
3. Animated digit display in the result
4. Transition effects between states (error, result, etc.)
5. Sound effects for button clicks, calculations, and errors
6. Confetti celebration animation for milestone calculations
7. Interactive hover and tap animations for buttons
8. Background animation effects
9. Dynamic color transitions and gradients
```

### Manual Adjustments
- Fixed import paths between components
- Added proper error handling for division by zero and negative results
- Enhanced the UI with better spacing and responsive design
- Added clear button functionality
- Integrated framer-motion for animations
- Added react-confetti for celebratory effects
- Created theme selector with multiple themes
- Added sound effect infrastructure
- Implemented animated UI elements and transitions
- Added responsive hover/focus effects