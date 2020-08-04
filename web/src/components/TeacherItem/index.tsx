import React from 'react';

import './styles.css'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'

function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars1.githubusercontent.com/u/2094316?s=460&v=4" alt="Diego Senott" />
                <div>
                    <strong>Diego Senott</strong>
                    <span>Física</span>
                </div>
            </header>

            <p>
                Mussum Ipsum, cacilds vidis litro abertis. Per aumento de cachacis, eu reclamis. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis. Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi. Interagi no mé, cursus quis, vehicula ac nisi.
                        <br /><br />
                        Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis. In elementis mé pra quem é amistosis quis leo. Manduma pindureta quium dia nois paga. Atirei o pau no gatis, per gatis num morreus.
                    </p>

            <footer>
                <p>
                    Preço/hora
                    <strong>R$ 80,00</strong>
                </p>
                <button type="button">
                    <img src={whatsappIcon} alt="whatsapp" />
                            Entrar em contato
                        </button>
            </footer>
        </article>
    )
}

export default TeacherItem;