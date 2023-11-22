import './KeyboardVisualizer.scss';
import windowsIcon from '../../Assets/Site/windowsIconBlack.png';

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

    return (
        <div className='KeyboardVisualizer'>
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
    )
}

export default KeyboardVisualizer;