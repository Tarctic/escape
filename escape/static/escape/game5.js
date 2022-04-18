const { useState, useEffect } = React;

const Start = ({setStart}) => {

    return(
        <div className="center d-flex flex-column">
            <button className="bt p-2" onClick={() =>{setStart(false)}}>START</button>
            <button className="bt p-2" onClick={() =>  window.location.href='/escape/login'}>Login</button>
            <button className="bt p-2">How to Play</button>
            <button className="bt p-2">About</button>
        </div>
    )
}

const Main = ({ bgProp, save, setSave }) => {


    const [obj, setObj] = useState(['inv',0,'door1','door2','clock','db','mc1','start'])
    const [items, setItem] = useState(['','','','','','','','','',])
    const [text, setText] = useState()
    const [speaking, setSpeaking] = useState(false)

    const [box,setBox] = useState({
        keyinv: false,
        paperinv: false
    })

    const openSave = () => {

        if (save==1) {
            setObj(['inv', 0, 'door1', 'door2', 'clock', 'db', 'mc1', 'dbclick'])
            setItem(['keyinv','','','','','','','','',])
        } 
        else if (save==2) {
            panel2()
        }
        else if (save==3) {
            panel2()
            setItem(['paperinv','','','','','','','','',])
        } 
        else if (save==4) {
            panel3()
            setItem(['paperinv','','','','','','','','',])
        } 
        else if (save==5) {
            panel4()
        }
    }

    const delAddObj = (d,a) => {
        var newObj = [...obj]
        if (d!=0) {
            newObj = obj.filter((o) => o!=d)
        }
        if (a!=0) {
            newObj.push(a)
        }
        console.log(newObj)
        setObj(newObj)
    }
    
    const addToInv = (item) => {
        const newItem = [...items]
        var n = 0;
        for (var i=0;i<newItem.length;i++) {
            var p = newItem[i]
            if (p=='') {
                n = i;
                break
            }
        }
        console.log(n)
        newItem[n] = item
        console.log(newItem)
        setItem(items => newItem)
    }

    const delFromInv = (item) => {
        const newItem = [...items]
        var finalItem = []
        for (var i=0;i<newItem.length;i++) {
            var p = newItem[i]
            if (p!=item) {
                finalItem.push(p)
            }
            else {
                finalItem.push('')
            }
        }
        console.log(finalItem)
        setItem(items => finalItem)
    }
    
    const panel2 = () => {
        bgProp('bg2')
        const newObj = ['inv','left1','mc2','paint',0]
        setObj(obj => newObj)
    }
    
    const panel3 = () => {
        bgProp('bg3')
        const newObj = ['inv','left2','right','mc3','nerd','text4']
        setObj(obj => newObj)
    }

    const panel4 = () => {
        setSave(5)
        bgProp('bg4')
        const newObj = ['end']
        setObj(obj => newObj)
        setTimeout(() => {
            const finalObj = ['endcard']
            setObj(obj => finalObj)
        }, 10000);
    }

    const func = (item) => {
        console.log(box[item])
        var namelist = ['keyinv','paperinv']
        var funclist = [key,paper]
        for (var i=0;i<namelist.length;i++) {
            if (item == namelist[i]) {
                funclist[i]()
            }
        }
        if (box[item]) {
            setBox({...box, keyinv: false})
        } else {
            setBox({...box, keyinv: true})
        }
    }
    const key = () => {
        if (obj.includes('key')) {
            delAddObj('key',0)
        } else {
            delAddObj(0,'key')
        }
    }

    const paper = () => {
        delAddObj(0,'bigpaper');
        delFromInv('paperinv')
    }
    
    const [code, setCode] = useState('')
    const onSubmit = (e) => {
        e.preventDefault()

        onAdd({ code })
        setCode('')
    }

    const onAdd = ({ code }) => {
        if (code == 'PGBDYU') {
            delAddObj('input','goleft')
        } else {
            delAddObj('input','text6')
        }
    }

    const say = (thing) => {
        setText(thing)
        delAddObj(0,'text')
        setSpeaking(true)
        console.log(thing)
    }

    return (
        <div class="main">
            {obj.includes('inv') &&
            <div className="inv d-flex flex-row">
            {items.map((item) => (
                <div className={`p-2 inv-box ${box[item] ? 'h':'' }`}>
                    <div className={item} onClick={() => func(item)} ></div>
                </div>
            ))}
            </div>
            }

            {/*Objects added will affect the position of all objects below them*/}

            {obj.includes('door1') && <div className="door1" onClick={() => {if (!speaking) {say("It won't budge")}}}></div>}
            {obj.includes('door2') && <div className="door2" onClick={() => {if (obj.includes('key')) {panel2();delFromInv('keyinv');setSave(2)} else {if (!speaking) {say("It's locked... Who would've guessed?")}}}}></div>}
            {obj.includes('clock') && <div className="clock" onClick={() => {if (!speaking) {say("The only thing faster than my math teacher...")}}}></div>}
            {obj.includes('db') && <div className="dustbin" onClick={() => {if (obj.includes('dbclick')) {addToInv('keyinv');delAddObj('dbclick',0);setSave(1); if (!speaking) {say("Huh? What's a key doing here?")}}}}></div>}
            {obj.includes('mc1') && <div className="mc mc1"></div>}
            {obj.includes('start') && <button className="start" onClick={() => {setSpeaking(true);delAddObj('start','text1');openSave()}} >Start</button>}
            {obj.includes('text1') && <div className="text text1" onClick={() => {delAddObj('text1','text2')}}>I've been trapped here for hours</div>}
            {obj.includes('text2') && <div className="text text1" onClick={() => {delAddObj('text2','text3')}}>Who thought detention would be this bad</div>}
            {obj.includes('text3') && <div className="text text1" onClick={() => {setSpeaking(false),delAddObj('text3','dbclick')}}>I need to find a way out . . .</div>}
            {obj.includes('text') && <div className="text text1" onClick={() => {setSpeaking(false),delAddObj('text',0)}}>{text}</div>}
            
            {obj.includes('mc2') && <div className="mc mc2"></div>}
            {obj.includes('left1') && <div className="left left1" onClick={() => {panel3();setSave(4)}}></div>}
            {obj.includes('paint') && <div className="paint" onClick={() => {if (!items.includes('paperinv')) {delAddObj('paint','behind')}}}></div>}
            {obj.includes('behind') && <div className="behind"></div>}
            {obj.includes('behind') && <div className="paper" onClick={() => {delAddObj('behind','paint');addToInv('paperinv');setSave(3);}}></div>}
            {obj.includes('bigpaper') && <div className="bigpaper" onClick={() => {delAddObj('bigpaper',0),addToInv('paperinv')}}></div>}

            {obj.includes('left2') && <div className="left left2" onClick={() => {if (obj.includes('goleft')) {panel4()}}}></div>}
            {obj.includes('right') && <div className="right" onClick={() => {panel2()}}></div>}
            {obj.includes('mc3') && <div className="mc mc3"></div>}
            {obj.includes('nerd') && <div className="nerd"></div>}
            {obj.includes('text4') && <div className="text text4" onClick={() => delAddObj('text4','text5')}>You shall not pass!</div>}
            {obj.includes('text5') && <div className="text text4" onClick={() => delAddObj('text5','input')}>*whispers* Unless you know the secret code...</div>}
            {obj.includes('input') && 
                <form className="form" onSubmit={onSubmit}>
                    <input type="text" value={code} onChange={(e) => setCode(e.target.value)}/>
                    <input type="submit" />
                </form>
            }
            {obj.includes('goleft') && <div className="text text4" onClick={() => panel4()}>hehe go right ahead...</div>}
            {obj.includes('text6') && <div className="text text4" onClick={() => {panel2()}}>WRONG CODE! GO BACK!</div>}
            {obj.includes('end') && <div className="end"></div>}
            {obj.includes('endcard') && <div className="endcard"></div>}

        </div>
    )
}

function App() {

    const [start,setStart] = useState(true)
    const [bg, setBg] = useState('bg1')

    const [save, setSave] = useState(0)
    
    const id = document.querySelector('#id').innerHTML

    if (id>0) {
        fetch(`http://127.0.0.1:8000/escape/save/${id}`)
       .then(response => response.json())
       .then(res => {
           setSave(res.savenum)
       })
    }

    const saveGame = (num) => {
        
        console.log(num)
        if (id>0) {
            fetch(`http://127.0.0.1:8000/escape/save/${id}`, {
                headers: {
                    'X-CSRFToken': csrf_token
                },
                method: 'POST',
                body: JSON.stringify({
                    data: num
                })
            })
        }
    }

    return (
        <div>
            <div className="startbg" style={{display: start ? 'block':'none'}}>
                <Start setStart={setStart} />
            </div>
            <div className={bg} style={{display: start ? 'none':'block'}}>
                <Main bgProp={setBg} save={save} setSave={saveGame}/>
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.querySelector("#app"));

// save progress by saving stuff to login
// stuff = getting the key, panel2, getting the paper, panel 3, end
// to do this, some variable or number will be stored in a model that tracks user progress
// once a stuff is clicked, post request will be sent to views.py and then saved to models.py
// when user comes back, continue from where they left by using a get request that gives tells us the progress
// then each progress var/num should trigger a function that sets the appropriate state
// state = panel, inventory, objects 

// less imp:
// + if user is logged in, show log out
// + if it's a new user show NEW GAME, otherwise show CONTINUE