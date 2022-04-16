import './App.css';
import {useEffect, useState} from "react";
import logoSrc from './logo.png'
const siteListKeyInLocalstorage = '__KEY__site-list'

function App() {

    const [popupStatus, setPopupStatus] = useState(false)
    const [siteName, setSiteName] = useState('')
    const [siteUrl, setSiteUrl] = useState('')
    const [activeSiteName, setActiveSiteName] = useState('')
    //{ name:string,url:string }
    const [siteList, setSiteList] = useState([])
    useEffect(() => {
        const cachedRes = localStorage.getItem(siteListKeyInLocalstorage)
        if (cachedRes) {
            setSiteList(JSON.parse(cachedRes))
        }
    })
    const addSiteToList = (siteItem) => {
        setSiteList(_prev => {
            const newList = [siteItem].concat(_prev)
            localStorage.setItem(siteListKeyInLocalstorage, JSON.stringify(newList))
            return newList
        })
    }
    const cleanUpAddition = () => {
        setSiteUrl('')
        setSiteName('')
        setPopupStatus(false)
    }
    const deleteItemByName = (name) => {
        const index = siteList.findIndex(item => item.name === name)
        setSiteList(_prev => {
            const newList = [].concat(_prev)
            newList.splice(index, 1)
            localStorage.setItem(siteListKeyInLocalstorage, JSON.stringify(newList))
            return newList
        })
    }
    return (
        <div className="app-container">
            <div className="app-left">
                <a href="/" className="logo-container">
                    <img src={logoSrc}/>
                </a>
                <div className="label-container">
                    {
                        siteList.map(item => {
                            return <div key={item.name} onClick={() => setActiveSiteName(item.name)}
                                        className={`label-item ${activeSiteName === item.name ? 'active' : ''}`}>
                                <span>{item.name}</span>
                                <span onClick={() => deleteItemByName(item.name)} className="delete-label">X</span>
                            </div>
                        })
                    }
                </div>
                <div className="bottom-container">
                    <div className="add-button" onClick={() => setPopupStatus(true)}>
                        <span>+</span>
                    </div>
                    <div className={`pop-up ${popupStatus ? 'open' : ''}`}>
                        <div className="header">
                            <span onClick={() => setPopupStatus(false)} style={{cursor: 'pointer'}}>X</span>
                        </div>
                        <div className="form-item">
                            <input onChange={e => setSiteName(e.target.value)} value={siteName} type="text"
                                   placeholder="站点简称"/>
                        </div>
                        <div className="form-item">
                            <input onChange={e => setSiteUrl(e.target.value)} value={siteUrl} type="text"
                                   placeholder="站点完整链接"/>
                        </div>
                        <div>
                            <button onClick={() => {
                                addSiteToList({
                                    name: siteName,
                                    url: siteUrl
                                })
                                cleanUpAddition()
                            }}>添加
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="app-right">
                {
                    siteList.map(item => {
                        return <iframe key={item.name}
                                       className={`iframe-container ${activeSiteName === item.name ? 'open' : ''}`}
                                       src={item.url}></iframe>
                    })
                }
            </div>
        </div>
    );
}

export default App;
