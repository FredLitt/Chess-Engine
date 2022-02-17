import React, { useState } from "react"

export default function GameOptionsBar({flipBoard, createNewGame, takeback, changeTheme}){

  const [ themesMenu, setThemesMenu ] = useState("closed")

  //changeTheme(light, dark)...

  const toggleThemeMenu = () => {
    if (themesMenu === "closed"){
      
      setThemesMenu("open")
      }
    if (themesMenu === "open"){
      setThemesMenu("closed")
      }
  }

  const colorSchemes = [
    { light: "lightgrey", dark: "slategrey" },
    { light: "pink", dark: "red" },
    { light: "lightblue", dark: "grey" }
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
      {themesMenu === "open" && 
        <div id="theme-options">
          {colorSchemes.map((scheme, index) =>
            <div 
              className="color-choice" 
              onClick={() => {
                changeTheme(scheme.light, scheme.dark)
                toggleThemeMenu()}}>
              <div style={{backgroundColor: scheme.light}}></div>
              <div style={{backgroundColor: scheme.dark}}></div>
            </div>
          )}
        </div>}
    </div>
  )
}