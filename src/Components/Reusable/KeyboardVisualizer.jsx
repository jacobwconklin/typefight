/* eslint-disable no-restricted-globals */
import './KeyboardVisualizer.scss';
import windowsIcon from '../../Assets/Site/windowsIconBlack.png';
import { useState } from 'react';
import { Slider } from 'antd';
import settings from '../../Assets/Site/cog.svg';
import ellipsis from '../../Assets/Site/horizontal-ellipsis.svg';

// KeyboardVisualizer
const KeyboardVisualizer = (props) => {

    // May want to accept props to have different Keyboards (for different devices, setups, languages, etc)
    // and even different sizes. For now I will hardcode to see what is possible

    // detect key down if it's id is found on keyboard light it up with "green" for now or later any chosen color
    document.addEventListener("keydown", (e) => {
            // e.preventDefault();
            const clickedElem = document.getElementById(e.code);
            if (clickedElem && clickedElem.style) {
                clickedElem.style.backgroundColor = 'green';
            }
            return true;
    });

    // on release of key turn color back to white
    document.addEventListener("keyup", (e) => {
        const clickedElem = document.getElementById(e.code);
        if (clickedElem && clickedElem.style) {
            clickedElem.style.backgroundColor = 'white';
        }
        return true;
    });

    // handle settings adjusting size, opacity, and position of keyboard
    // TODO could also let user change colors / font / font size etc. 

    // handles opening settings bar when clicked
    const [showSettings, setShowSettings] = useState(true);
    const [opacity, setOpacity] = useState(75);
    const [size, setSize] = useState(window.innerWidth / 2.5 < 450 ? 450 : window.innerWidth / 2.5);
    // const [upTranslate, setUpTranlate] = useState(0);
    // const [rightTranslate, setRightTranslate] = useState(0);
    
    const percentFormatter = (value) => `${value}%`;
    const pixelFormatter = (value) => `${value}px`;   


    // handle dragging keyboard from: https://www.w3schools.com/howto/howto_js_draggable.asp
    const dragElement = (elmnt) => {
        if (elmnt) {
            var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            if (document.getElementById("drag-box")) {
                // if present only allow moving by the drag-box
                document.getElementById("drag-box").onmousedown = dragMouseDown;
            } 
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    // when keyboard is first mounted drag-box may not appear on document yet
    dragElement(document.getElementById("keyboard-visualizer"));
    setTimeout(() => {
        dragElement(document.getElementById("keyboard-visualizer"));
    }, 300);


    return (
        <div className='KeyboardVisualizer' id='keyboard-visualizer'
            style={{opacity: (opacity + "%"), width: size + 'px', fontSize: `${size * 0.0178}px`, }}
        >
            
            <div className='Rows' style={{height: (~~(size / 3)) + 'px'}}>
                <div className='Row'>
                    <div className='Key Double Tilde' id='Backquote'>
                        <div>
                            ~
                        </div>
                        <div>
                            `
                        </div>
                    </div>
                    <div className='Key Double' id='Digit1'>
                        <div>
                            !
                        </div>
                        <div>
                            1
                        </div>
                    </div>
                    <div className='Key Double' id='Digit2'>
                        <div>
                            @
                        </div>
                        <div>
                            2
                        </div>
                    </div>
                    <div className='Key Double' id='Digit3'>
                        <div>
                            #
                        </div>
                        <div>
                            3
                        </div>
                    </div>
                    <div className='Key Double' id='Digit4'>
                        <div>
                            $
                        </div>
                        <div>
                            4
                        </div>
                    </div>
                    <div className='Key Double' id='Digit5'>
                        <div>
                            %
                        </div>
                        <div>
                            5
                        </div>
                    </div>                
                    <div className='Key Double' id='Digit6'>
                        <div>
                            ^
                        </div>
                        <div>
                            6
                        </div>
                    </div>
                    <div className='Key Double' id='Digit7'>
                        <div>
                            &
                        </div>
                        <div>
                            7
                        </div>
                    </div>
                    <div className='Key Double' id='Digit8'>
                        <div>
                            *
                        </div>
                        <div>
                            8
                        </div>
                    </div>
                    <div className='Key Double' id='Digit9'>
                        <div>
                            &#40;
                        </div>
                        <div>
                            9
                        </div>
                    </div>
                    <div className='Key Double' id='Digit0'>
                        <div>
                            &#41;
                        </div>
                        <div>
                            0
                        </div>
                    </div>
                    <div className='Key Double' id='Minus'>
                        <div>
                            _
                        </div>
                        <div>
                            -
                        </div>
                    </div>
                    <div className='Key Double' id='Equal'>
                        <div>
                            +
                        </div>
                        <div>
                            =
                        </div>
                    </div>
                    <div className='Key Backspace' id='Backspace'>
                        backspace
                    </div>
                </div>
                <div className='Row'>
                    <div className='Key Tab' id='Tab'>
                        tab
                    </div>
                    <div className='Key ' id='KeyQ'>
                        Q
                    </div>
                    <div className='Key ' id='KeyW'>
                        W
                    </div>
                    <div className='Key ' id='KeyE'>
                        E
                    </div>
                    <div className='Key ' id='KeyR'>
                        R
                    </div>
                    <div className='Key ' id='KeyT'>
                        T
                    </div>
                    <div className='Key ' id='KeyY'>
                        Y
                    </div>
                    <div className='Key ' id='KeyU'>
                        U
                    </div>
                    <div className='Key ' id='KeyI'>
                        I
                    </div>
                    <div className='Key ' id='KeyO'>
                        O
                    </div>
                    <div className='Key ' id='KeyP'>
                        P
                    </div>
                    <div className='Key  Double' id='BracketLeft'>
                        <div>
                            &#123;
                        </div>
                        <div>
                            &#91;
                        </div>
                    </div>
                    
                    <div className='Key  Double' id='BracketRight'>
                        <div>
                            &#125;
                        </div>
                        <div>
                            &#93;
                        </div>
                    </div>
                    <div className='Key Pipe Double' id='Backslash'>
                        <div>
                            &#124;
                        </div>
                        <div>
                            &#92;
                        </div>
                    </div>
                </div>
                <div className='Row'>
                    <div className='Key CapsLock' id='CapsLock'>
                        caps lock
                    </div>
                    <div className='Key ' id='KeyA'>
                        A
                    </div>
                    <div className='Key ' id='KeyS'>
                        S
                    </div>
                    <div className='Key ' id='KeyD'>
                        D
                    </div>
                    <div className='Key ' id='KeyF'>
                        F
                    </div>
                    <div className='Key ' id='KeyG'>
                        G
                    </div>
                    <div className='Key ' id='KeyH'>
                        H
                    </div>
                    <div className='Key ' id='KeyJ'>
                        J
                    </div>
                    <div className='Key ' id='KeyK'>
                        K
                    </div>
                    <div className='Key ' id='KeyL'>
                        L
                    </div>
                    <div className='Key Double' id='Semicolon'>
                        <div>
                            :
                        </div>
                        <div>
                            ;
                        </div>
                    </div>
                    <div className='Key Double' id='Quote'>
                        <div>
                            "
                        </div>
                        <div>
                            '
                        </div>
                    </div>
                    <div className='Key Enter' id='Enter'>
                        enter
                    </div>
                </div>
                <div className='Row'>
                    <div className='Key Shift' id='ShiftLeft'>
                        shift
                    </div>
                    <div className='Key ' id='KeyZ'>
                        Z
                    </div>
                    <div className='Key ' id='KeyX'>
                        X
                    </div>
                    <div className='Key ' id='KeyC'>
                        C
                    </div>
                    <div className='Key ' id='KeyV'>
                        V
                    </div>
                    <div className='Key ' id='KeyB'>
                        B
                    </div>
                    <div className='Key ' id='KeyN'>
                        N
                    </div>
                    <div className='Key ' id='KeyM'>
                        M
                    </div>
                    <div className='Key  Double' id='Comma'>
                        <div>
                            &#60;
                        </div>
                        <div>
                            &#44;
                        </div>
                    </div>
                    <div className='Key  Double' id='Period'>
                        <div>
                            &#62;
                        </div>
                        <div>
                            &#46;
                        </div>
                    </div>
                    <div className='Key  Double' id='Slash'>
                        <div>
                            &#63;
                        </div>
                        <div>
                            &#47;
                        </div>
                    </div>
                    <div className='Key RightShift' id='ShiftRight'>
                        shift
                    </div>
                </div>
                <div className='Row'>
                    <div className='Key LeftCtrl' id='ControlLeft'>
                        ctrl
                    </div>
                    <div className='Key ' id='Function'>
                        fn
                    </div>
                    <div className='Key ' id='MetaLeft'>
                        <img className='Windows' src={windowsIcon} alt='Windows Icon' />
                    </div>
                    <div className='Key ' id='AltLeft'>
                        alt
                    </div>
                    <div className='Key Spacebar' id='Space'>
                        
                    </div>
                    <div className='Key ' id='AltRight'>
                        alt
                    </div>
                    <div className='Key ' id='ControlRight'>
                        ctrl
                    </div>
                    <div className='Key HorizontalArrow' id='ArrowLeft'>
                        &larr;
                    </div>
                    <div className='VerticalArrows'> 
                        <div className='Key VerticalArrow Up' id='ArrowUp'>
                            &uarr;
                        </div>
                        <div className='Key VerticalArrow Down' id='ArrowDown'>
                            &darr;
                        </div>
                    </div>
                    <div className='Key HorizontalArrow' id='ArrowRight'>
                        &rarr;
                    </div>
                </div>
            </div>
            <div className='Settings'>
                {
                    showSettings ? 
                    <div className='ShownSettings'>
                        <div className='ShownSettingsIndicator'
                            onClick={() => {
                                setShowSettings(false);
                            }}
                        >
                            <img className='SettingsGear' src={settings} alt='Hide Settings' />
                        </div>
                        <div className='OpacitySetting'>
                            <h4>Opacity</h4>               
                            <Slider 
                                tooltip={{ formatter: percentFormatter }} 
                                onChange={(e) => {
                                    setOpacity(e);
                                }}
                                // onAfterChange calls when user lets go with mouse if desired
                                defaultValue={50}
                                min={10}
                            />
                        </div>
                        <div className='SizeSetting'>
                            <h4 >Size</h4>    
                            <Slider 
                                tooltip={{ formatter: pixelFormatter }} 
                                onChange={(e) => {
                                    setSize(e);
                                }}
                                // onAfterChange calls when user lets go with mouse if desired
                                defaultValue={window.innerWidth / 2.5}
                                min={450}
                                max={~~(window.innerWidth / 1.0)} // TODO haven't settled on this tried 2 and 1.5 leaving 1 for now for fun
                            />
                        </div>
                        <div className='PositionSetting'>
                            <h4  style={{marginBottom: '5px'}} >Position</h4> 
                            <div className='DragBox' id='drag-box'>
                                Click Here To Drag
                            </div>
                        </div>
                    </div>
                    :
                    <div className='HiddenSettings'>
                        <div className='HiddenSettingsIndicator'
                            onClick={() => {
                                setShowSettings(true);
                                setTimeout(() => {
                                    dragElement(document.getElementById("keyboard-visualizer"));
                                    setTimeout(() => {
                                        dragElement(document.getElementById("keyboard-visualizer"));
                                    }, 200)
                                }, 100)
                            }}
                        >
                            <img className='Ellipsis' src={ellipsis} alt='Show Settings' />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default KeyboardVisualizer;