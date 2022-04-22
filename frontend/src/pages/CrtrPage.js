import React from 'react'
import axios from 'axios'
import './CrtrPage.css'
// import { sendFile } from "express/lib/response";

export const CrtrPage = () => {
    document.body.style = 'background: #474763ca;'

    const [img, setImg] = React.useState(null)
    const [, setAvatar] = React.useState(null)

    const sendFile = React.useCallback(async () => {
        const data = new FormData()
        data.append('fileName', img)

        await axios
            .post('/api/auth/upload', data, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })

            .then(res => setAvatar(res.data.path))
    }, [img])

    return (
        <div className='row1'>
            <form className='col s12'>
                <div className='input-field s12' style={{ width: '40%' }}>
                    <input
                        id='NameCinema'
                        type='text'
                        className='validate'
                        style={{ color: '#FFFFFF' }}
                    />
                    <label htmlFor='NameCinema'>Название фильма</label>
                </div>

                <label className='file-field input-field' style={{ width: '40%' }}>
                    <div
                        className='waves-effect waves-light btn'
                        style={{ background: '#5695b094' }}
                    >
                        <span>Заставка</span>
                        <input type='file' onChange={e => setImg(e.target.files[0])} />
                    </div>
                    <div className='file-path-wrapper'>
                        <input
                            className='file-path validate'
                            placeholder='Файл не выбран'
                            type='text'
                            style={{ color: '#FFFFFF' }}
                        />
                    </div>
                </label>

                <div className='input-field s12'>
                    <textarea
                        id='short_description'
                        className='materialize-textarea'
                        rows='5'
                        style={{ color: '#FFFFFF' }}
                    ></textarea>
                    <label htmlFor='textarea1'>Краткое описание</label>
                </div>

                <div className='input-field s12'>
                    <textarea
                        id='full_description'
                        className='materialize-textarea'
                        rows='5'
                        style={{ color: '#FFFFFF' }}
                    ></textarea>
                    <label htmlFor='textarea1'>Развёрнутое описание</label>
                </div>
            </form>
            <div>
                <a className='btn-large' style={{ background: '#5695b094' }} onClick={sendFile()}>
                    Создать фильм
                </a>
            </div>
        </div>
    )
}

//    <a className="btn-large purple darken-4t" style={{ position: "absolute", right: "10", top:"5"}}>СОЗДАТЬ ФИЛЬМ</a>
