import './KeyboardVisualizer.scss';

// KeyboardVisualizer
const KeyboardVisualizer = (props) => {

    // May want to accept props to have different Keyboards (for different devices, setups, languages, etc)
    // and even different sizes. For now I will hardcode to see what is possible
    // may need to take in Keys pressed as prompt? Can design input to feed it with state idk
    //const [pressedKeys, setPressedKeys] = useState([]);

    return (
        <div className='KeyboardVisualizer'>
            <div className='Row'>
                <div className='Key Double Tilde'>
                    <div>
                        ~
                    </div>
                    <div>
                        `
                    </div>
                </div>
                <div className='Key Double'>
                    <div>
                        !
                    </div>
                    <div>
                        1
                    </div>
                </div>
                <div className='Key Double'>
                    <div>
                        @
                    </div>
                    <div>
                        2
                    </div>
                </div>
                <div className='Key Double'>
                    <div>
                        #
                    </div>
                    <div>
                        3
                    </div>
                </div>
                <div className='Key Double'>
                    <div>
                        $
                    </div>
                    <div>
                        4
                    </div>
                </div>
                <div className='Key Double'>
                    <div>
                        %
                    </div>
                    <div>
                        5
                    </div>
                </div>                
                <div className='Key Double'>
                    <div>
                        ^
                    </div>
                    <div>
                        6
                    </div>
                </div>
                <div className='Key Double'>
                    <div>
                        &
                    </div>
                    <div>
                        7
                    </div>
                </div>
                <div className='Key Double'>
                    <div>
                        *
                    </div>
                    <div>
                        8
                    </div>
                </div>
                <div className='Key Double'>
                    <div>
                        &#40;
                    </div>
                    <div>
                        9
                    </div>
                </div>
                <div className='Key Double'>
                    <div>
                        &#41;
                    </div>
                    <div>
                        0
                    </div>
                </div>
                <div className='Key Double'>
                    <div>
                        _
                    </div>
                    <div>
                        -
                    </div>
                </div>
                <div className='Key Double'>
                    <div>
                        +
                    </div>
                    <div>
                        =
                    </div>
                </div>
                <div className='Key Backspace'>
                    backspace
                </div>
            </div>
            <div className='Row'>
                <div className='Key Tab'>
                    tab
                </div>
                <div className='Key '>
                    Q
                </div>
                <div className='Key '>
                    W
                </div>
                <div className='Key '>
                    E
                </div>
                <div className='Key '>
                    R
                </div>
                <div className='Key '>
                    T
                </div>
                <div className='Key '>
                    Y
                </div>
                <div className='Key '>
                    U
                </div>
                <div className='Key '>
                    I
                </div>
                <div className='Key '>
                    O
                </div>
                <div className='Key '>
                    P
                </div>
                <div className='Key  Double'>
                    <div>
                        &#123;
                    </div>
                    <div>
                        &#91;
                    </div>
                </div>
                
                <div className='Key  Double'>
                    <div>
                        &#125;
                    </div>
                    <div>
                        &#93;
                    </div>
                </div>
                <div className='Key Pipe Double'>
                    <div>
                        &#124;
                    </div>
                    <div>
                        &#92;
                    </div>
                </div>
            </div>
            <div className='Row'>
                <div className='Key CapsLock'>
                    caps lock
                </div>
                <div className='Key '>
                    A
                </div>
                <div className='Key '>
                    S
                </div>
                <div className='Key '>
                    D
                </div>
                <div className='Key '>
                    F
                </div>
                <div className='Key '>
                    G
                </div>
                <div className='Key '>
                    H
                </div>
                <div className='Key '>
                    J
                </div>
                <div className='Key '>
                    K
                </div>
                <div className='Key '>
                    L
                </div>
                <div className='Key Double'>
                    <div>
                        :
                    </div>
                    <div>
                        ;
                    </div>
                </div>
                <div className='Key Double'>
                    <div>
                        "
                    </div>
                    <div>
                        '
                    </div>
                </div>
                <div className='Key Enter'>
                    enter
                </div>
            </div>
            <div className='Row'>
                <div className='Key Shift'>
                    shift
                </div>
                <div className='Key '>
                    Z
                </div>
                <div className='Key '>
                    X
                </div>
                <div className='Key '>
                    C
                </div>
                <div className='Key '>
                    V
                </div>
                <div className='Key '>
                    B
                </div>
                <div className='Key '>
                    N
                </div>
                <div className='Key '>
                    M
                </div>
                <div className='Key  Double'>
                    <div>
                        &#60;
                    </div>
                    <div>
                        &#44;
                    </div>
                </div>
                <div className='Key  Double'>
                    <div>
                        &#62;
                    </div>
                    <div>
                        &#46;
                    </div>
                </div>
                <div className='Key  Double'>
                    <div>
                        &#63;
                    </div>
                    <div>
                        &#47;
                    </div>
                </div>
                <div className='Key RightShift'>
                    shift
                </div>
            </div>
            <div className='Row'>
                <div className='Key LeftCtrl'>
                    ctrl
                </div>
                <div className='Key '>
                    fn
                </div>
                <div className='Key '>
                    Windows
                </div>
                <div className='Key '>
                    alt
                </div>
                <div className='Key Spacebar'>
                    
                </div>
                <div className='Key '>
                    &larr;
                </div>
                <div className='Key '>
                    &uarr;
                </div>
                <div className='Key '>
                    &darr;
                </div>
                <div className='Key '>
                    &rarr;
                </div>
            </div>
        </div>
    )
}

export default KeyboardVisualizer;