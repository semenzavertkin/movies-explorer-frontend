import './AboutMe.css';
import avatar from '../../../images/avatar.png'

const AboutMe = () => {
  return (
    <section className="section about-me" id="about-me">
      <h2 className="section__title">Студент</h2>
      <div className="about-me__profile">
        <div className='about-me__info'>
          <h3 className="about-me__name">Виталий</h3>
          <p className="about-me__job">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__description">Я родился и живу в Саратове,
            закончил факультет экономики СГУ. У меня есть жена
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
            Недавно начал кодить. С 2015 года работал в компании
            «СКБ Контур». После того, как прошёл курс по веб-разработке,
            начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a className="about-me__info-link" href="https://github.com/semenzavertkin" target="_blank" rel="noreferrer">Github</a>
        </div>
        <img src={avatar} alt="Фото студента" className="about-me__avatar" />
      </div>
    </section>
  );
};

export default AboutMe;