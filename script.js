const header=document.querySelector('.site-header');const toggle=document.querySelector('.menu-toggle');toggle.addEventListener('click',()=>{const open=header.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open))});header.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{header.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));

document.querySelectorAll('.patient-type, .contact-methods').forEach(group=>{
  group.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{
    group.querySelectorAll('button').forEach(item=>{
      item.classList.remove('active');
      item.setAttribute('aria-pressed','false');
    });
    button.classList.add('active');
    button.setAttribute('aria-pressed','true');
  }));
});

document.querySelector('.appointment-form')?.addEventListener('submit',event=>event.preventDefault());

const quizData=[
  {question:'Для кого подбираете консультацию?',options:['Для себя','Для ребёнка','Для близкого человека','Пока уточняю']},
  {question:'Что вас беспокоит?',options:['Боль в спине','Боль в шее','Головные боли','Скованность в суставах','Напряжение в мышцах','Ограничение движений','После травм / нагрузок','Другое']},
  {question:'Как давно появились симптомы?',options:['Несколько дней','До месяца','От 1 до 6 месяцев','Более полугода']},
  {question:'Как часто возникает дискомфорт?',options:['Редко','Несколько раз в месяц','Несколько раз в неделю','Почти каждый день']},
  {question:'Что усиливает неприятные ощущения?',options:['Физическая нагрузка','Долгое сидение','Стресс и усталость','Не могу определить']},
  {question:'Какой результат для вас важнее?',options:['Уменьшить боль','Вернуть подвижность','Снизить напряжение','Получить рекомендации']}
];
const quiz=document.querySelector('.fit-quiz');
if(quiz){
  let currentStep=1;
  const answers={};
  const stepLabel=quiz.querySelector('.quiz-step');
  const progress=quiz.querySelector('.quiz-progress i');
  const percent=quiz.querySelector('.quiz-percent');
  const question=quiz.querySelector('.quiz-question');
  const options=quiz.querySelector('.quiz-options');
  const back=quiz.querySelector('.quiz-back');
  const next=quiz.querySelector('.quiz-next');
  const renderQuiz=()=>{
    const data=quizData[currentStep];
    const value=Math.round((currentStep+1)/quizData.length*100);
    stepLabel.textContent=`Шаг ${currentStep+1} из ${quizData.length}`;
    progress.style.width=`${value}%`;
    percent.textContent=`${value}%`;
    question.textContent=data.question;
    options.innerHTML=data.options.map(item=>`<button type="button"${answers[currentStep]===item?' class="selected"':''}>${item}</button>`).join('');
    options.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{
      answers[currentStep]=button.textContent;
      options.querySelectorAll('button').forEach(item=>item.classList.toggle('selected',item===button));
    }));
    back.disabled=currentStep===0;
    next.textContent=currentStep===quizData.length-1?'Получить результат':'Далее';
  };
  back.addEventListener('click',()=>{if(currentStep>0){currentStep--;renderQuiz()}});
  next.addEventListener('click',()=>{
    if(currentStep<quizData.length-1){currentStep++;renderQuiz();return}
    question.textContent='Консультация может вам подойти';
    options.innerHTML='<p style="grid-column:1/-1;margin:8px 0;color:#5d6561;line-height:1.6">Окончательное решение принимается совместно со специалистом после уточнения вашего состояния.</p>';
    next.textContent='Записаться на приём';
    next.onclick=()=>document.querySelector('#contact')?.scrollIntoView({behavior:'smooth'});
  });
  renderQuiz();
}

const documentModal=document.querySelector('.document-modal');
if(documentModal){
  const modalImage=documentModal.querySelector('img');
  const closeModal=()=>{documentModal.classList.remove('open');documentModal.setAttribute('aria-hidden','true');modalImage.src=''};
  document.querySelectorAll('[data-document]').forEach(button=>button.addEventListener('click',()=>{
    modalImage.src=button.dataset.document;
    modalImage.alt=button.querySelector('img')?.alt||'Документ';
    documentModal.classList.add('open');
    documentModal.setAttribute('aria-hidden','false');
  }));
  documentModal.querySelector('.document-modal-close').addEventListener('click',closeModal);
  documentModal.addEventListener('click',event=>{if(event.target===documentModal)closeModal()});
  document.addEventListener('keydown',event=>{if(event.key==='Escape')closeModal()});
}

document.querySelectorAll('.faq-item>button').forEach(button=>button.addEventListener('click',()=>{
  const item=button.closest('.faq-item');
  const column=item.closest('.faq-column');
  const willOpen=!item.classList.contains('open');
  column.querySelectorAll('.faq-item').forEach(other=>{
    other.classList.remove('open');
    other.querySelector('button').setAttribute('aria-expanded','false');
  });
  if(willOpen){item.classList.add('open');button.setAttribute('aria-expanded','true')}
}));

document.querySelectorAll('.final-toggle').forEach(group=>group.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{
  group.querySelectorAll('button').forEach(item=>{item.classList.remove('active');item.setAttribute('aria-pressed','false')});
  button.classList.add('active');
  button.setAttribute('aria-pressed','true');
})));
document.querySelector('.final-form')?.addEventListener('submit',event=>event.preventDefault());
