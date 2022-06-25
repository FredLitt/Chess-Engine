import React, { useState } from "react"

export default function GameOptionsBar({flipBoard, createNewGame, takeback, changeTheme}){

  const [ showColorThemes, setShowColorThemes ] = useState(false)

  const toggleThemeMenu = () => {
    setShowColorThemes(!showColorThemes)
  } 

  const colorSchemes = [
    { light: "beige", dark: "tan", highlight: "peru" },
    { light: "lightgrey", dark: "slategrey", highlight: "darkslategrey" },
    { light: "skyblue", dark: "steelblue", highlight: "darkblue" },
    { light: "darkseagreen", dark: "green", highlight: "forestgreen" },
    { light: "palevioletred", dark: "darkmagenta", highlight: "lightblue" }
  ]

  return (
    <div id="game-options-bar">
      <button
        onClick={() => {createNewGame()}}
        >New Game</button>
      <button 
        onClick={() => {flipBoard()}}
        >Flip Board</button>
      <button
        onClick={() => {takeback()}}
        >Takeback</button>
      <button
        onClick={() => {toggleThemeMenu()}}
        >Board Theme</button>
      
      {showColorThemes && 
        <div id="theme-options">
          {colorSchemes.map((scheme, index) =>
            <div 
              className="color-choice" 
              onClick={() => {
                changeTheme(scheme.light, scheme.dark, scheme.highlight)
                toggleThemeMenu()}}>
              <div style={{backgroundColor: scheme.light}}></div>
              <div style={{backgroundColor: scheme.dark}}></div>
            </div>
          )}
        </div>}
    </div>
  )
}