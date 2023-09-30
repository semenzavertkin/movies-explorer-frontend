import './AboutProject.css';

const AboutProject = () => {
  return (
    <section className="section about-project" id="about-project">
      <h2 className="section__title">О проекте</h2>
      <div className="about-project__info">
        <div className="about-project__info-section">
          <h3 className="about-project__info-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__info-description">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__info-section">
          <h3 className="about-project__info-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__info-description">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__scheme">
        <div className="about-project__scheme-backend">
          <div className="about-project__scheme-backend-duration">
            <p className="about-project__scheme-duration">1 неделя</p>
          </div>
          <p className="about-project__scheme-title">Back-end</p>
        </div>
        <div className="about-project__scheme-frontend">
          <div className="about-project__scheme-frontend-duration">
            <p className="about-project__scheme-duration about-project__scheme-duration_color">4 недели</p>
          </div>
          <p className="about-project__scheme-title">Front-end</p>
        </div>
      </div>
    </section>
  );
};

export default AboutProject;