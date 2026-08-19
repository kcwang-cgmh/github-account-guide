"use client";

import { useState } from "react";

const signupUrl = "https://github.com/signup";

const steps = [
  {
    number: "01",
    label: "先準備好",
    title: "準備一個能收信的 Email",
    description:
      "GitHub 會用 Email 驗證你的帳號。先準備一個你現在能開啟收信的地址，註冊過程會順利很多。",
    points: [
      "可以正常收信的 Email 地址",
      "想使用的 username（會出現在個人頁網址）",
      "一組沒有在其他網站重複使用的密碼",
    ],
    note: "username 會成為你的 GitHub 身分識別，建議短一點、好記一點。",
  },
  {
    number: "02",
    label: "開始註冊",
    title: "前往 GitHub 註冊頁",
    description:
      "打開官方註冊頁，依照畫面填寫 Email、密碼與 username。你也可以選擇使用 Google 快速建立帳號。",
    points: [
      "開啟 github.com/signup",
      "填寫 Email、Password 與 Username",
      "依畫面完成簡單的驗證或偏好設定",
    ],
    note: "註冊頁的欄位與文字可能隨 GitHub 更新而微調，但流程核心不變。",
  },
  {
    number: "03",
    label: "完成驗證",
    title: "到信箱確認你的 Email",
    description:
      "註冊送出後，GitHub 會寄出驗證信。打開信件，點選驗證連結或輸入信中的驗證碼，即可啟用完整功能。",
    points: [
      "查看收件匣與垃圾郵件匣",
      "點選 GitHub 寄來的驗證連結",
      "回到 GitHub 確認畫面已顯示驗證完成",
    ],
    note: "沒有收到信？登入後前往 Settings → Emails，可以重新寄送驗證信。",
  },
  {
    number: "04",
    label: "保護帳號",
    title: "做好第一輪基本設定",
    description:
      "帳號可以登入後，先確認方案與安全設定。GitHub Free 已足夠開始學習、建立公開或私有 repository。",
    points: [
      "確認使用 GitHub Free 免費方案",
      "設定 2FA，增加登入時的安全性",
      "補上顯示名稱與簡短個人介紹",
    ],
    note: "2FA 是額外的安全防線；也可以視需求再加入 passkey。",
  },
] as const;

const checklist = [
  "Email 已完成驗證",
  "記住自己的 username",
  "已設定顯示名稱與個人介紹",
  "已開啟 2FA 或準備稍後設定",
  "知道下一步要建立哪個 repository",
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [doneChecks, setDoneChecks] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);

  const activeStep = steps[currentStep];
  const checklistProgress = Math.round((doneChecks.length / checklist.length) * 100);

  const moveToStep = (index: number) => {
    setCurrentStep(index);
    window.setTimeout(() => {
      document.getElementById("guide-content")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 40);
  };

  const toggleCheck = (index: number) => {
    setDoneChecks((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  };

  const copySignupUrl = async () => {
    let copiedSuccessfully = false;

    try {
      await navigator.clipboard.writeText(signupUrl);
      copiedSuccessfully = true;
    } catch {
      const fallback = document.createElement("textarea");
      fallback.value = signupUrl;
      fallback.style.position = "fixed";
      fallback.style.opacity = "0";
      document.body.appendChild(fallback);
      fallback.select();
      copiedSuccessfully = document.execCommand("copy");
      fallback.remove();
    }

    if (copiedSuccessfully) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <main>
      <nav className="site-nav" aria-label="主要導覽">
        <a className="brand" href="#top" aria-label="回到頁首">
          <span className="brand-mark">GH</span>
          <span>第一個 GitHub 帳號</span>
        </a>
        <div className="nav-links">
          <a href="#guide">申請流程</a>
          <a href="#checklist">完成清單</a>
          <a href="#faq">常見問題</a>
        </div>
        <a className="nav-cta" href={signupUrl} target="_blank" rel="noreferrer">
          前往註冊 <span aria-hidden="true">↗</span>
        </a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" />給第一次註冊 GitHub 的你</p>
          <h1>建立你的第一個 <span>GitHub</span> 帳號。</h1>
          <p className="hero-description">
            不用背術語，也不用一次學會所有功能。跟著這份 10 分鐘指南，完成註冊、Email 驗證，並把帳號安全設定好。
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#guide">
              開始申請 <span aria-hidden="true">↓</span>
            </a>
            <a className="text-link" href={signupUrl} target="_blank" rel="noreferrer">
              直接開啟 GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="hero-meta">
            <span><strong>01</strong> 個 Email</span>
            <span className="meta-line" aria-hidden="true" />
            <span><strong>04</strong> 個步驟</span>
            <span className="meta-line" aria-hidden="true" />
            <span><strong>約 10</strong> 分鐘</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="GitHub 帳號建立示意圖">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="visual-dots dots-one">···</div>
          <div className="visual-dots dots-two">⁙</div>
          <div className="signup-card">
            <div className="signup-card-top">
              <span className="window-dots"><i /><i /><i /></span>
              <span className="card-label">ACCOUNT SETUP / 01</span>
            </div>
            <div className="signup-card-body">
              <div className="github-tile">GH</div>
              <p className="mock-title">Create your account</p>
              <p className="mock-subtitle">Your coding journey starts here.</p>
              <div className="mock-field"><span>Email address</span><b>you@example.com</b></div>
              <div className="mock-field"><span>Password</span><b>••••••••••</b></div>
              <div className="mock-submit">Continue <span>→</span></div>
            </div>
            <div className="signup-card-bottom">
              <span><b>01</b> / 04</span>
              <span className="tiny-progress"><i /></span>
              <span>Start here</span>
            </div>
          </div>
          <div className="visual-sticker">不需要信用卡 <span>✦</span></div>
        </div>
      </section>

      <section className="promise-bar" aria-label="註冊重點">
        <div className="promise-label"><span className="mini-star">✦</span> 你會完成什麼</div>
        <div className="promise-item"><span className="promise-number">01</span><span>建立個人帳號</span></div>
        <div className="promise-item"><span className="promise-number">02</span><span>驗證 Email</span></div>
        <div className="promise-item"><span className="promise-number">03</span><span>認識 Free 方案</span></div>
        <div className="promise-item"><span className="promise-number">04</span><span>開啟帳號安全性</span></div>
      </section>

      <section className="content-section guide-section" id="guide">
        <div className="section-heading">
          <div>
            <p className="section-kicker">THE SHORT PATH / 01</p>
            <h2>四個步驟，<em>完成註冊。</em></h2>
          </div>
          <p className="section-intro">先準備一個能收信的 Email，接著跟著右側指引一步一步做就好。</p>
        </div>

        <div className="guide-layout">
          <div className="step-list" role="tablist" aria-label="GitHub 註冊步驟">
            {steps.map((step, index) => (
              <button
                className={`step-tab ${index === currentStep ? "is-active" : ""}`}
                key={step.number}
                onClick={() => moveToStep(index)}
                role="tab"
                aria-selected={index === currentStep}
                aria-controls="guide-content"
              >
                <span className="step-tab-number">{step.number}</span>
                <span className="step-tab-text">
                  <small>{step.label}</small>
                  <strong>{step.title}</strong>
                </span>
                <span className="step-arrow" aria-hidden="true">↗</span>
              </button>
            ))}
            <div className="step-tip">
              <span className="tip-icon">?</span>
              <p><strong>第一次用 GitHub？</strong><br />不用先懂 Git，先把帳號建立起來。</p>
            </div>
          </div>

          <article className="guide-card" id="guide-content" role="tabpanel">
            <div className="guide-card-top">
              <span className="current-step">STEP {activeStep.number}</span>
              <span className="current-label">{activeStep.label}</span>
            </div>
            <h3>{activeStep.title}</h3>
            <p className="guide-description">{activeStep.description}</p>
            <div className="point-list">
              {activeStep.points.map((point) => (
                <div className="point-item" key={point}>
                  <span className="point-check">✓</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
            <div className="guide-note"><span>✦</span><p>{activeStep.note}</p></div>
            {currentStep === 1 && (
              <div className="url-tools">
                <a className="button button-dark" href={signupUrl} target="_blank" rel="noreferrer">
                  開啟註冊頁 <span aria-hidden="true">↗</span>
                </a>
                <button className="copy-button" onClick={copySignupUrl}>
                  {copied ? "已複製網址 ✓" : "複製註冊網址"}
                </button>
              </div>
            )}
            <div className="guide-card-footer">
              <button className="quiet-button" onClick={() => moveToStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0}>
                ← 上一步
              </button>
              <div className="card-progress" aria-label={`目前第 ${currentStep + 1} 步，共 ${steps.length} 步`}>
                <span>{String(currentStep + 1).padStart(2, "0")}</span>
                <div><i style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} /></div>
                <span>{String(steps.length).padStart(2, "0")}</span>
              </div>
              <button className="next-button" onClick={() => moveToStep((currentStep + 1) % steps.length)}>
                {currentStep === steps.length - 1 ? "重新看一次" : "完成，下一步"} <span aria-hidden="true">→</span>
              </button>
            </div>
          </article>
        </div>
      </section>

      <section className="content-section checklist-section" id="checklist">
        <div className="section-heading compact-heading">
          <div>
            <p className="section-kicker">YOUR QUICK CHECK / 02</p>
            <h2>註冊完成後，<em>確認這 5 件事。</em></h2>
          </div>
          <div className="check-progress-box">
            <span>{doneChecks.length} / {checklist.length} 已完成</span>
            <div className="check-progress"><i style={{ width: `${checklistProgress}%` }} /></div>
          </div>
        </div>
        <div className="checklist-card">
          <div className="checklist-intro">
            <span className="checklist-badge">READY?</span>
            <h3>你的 GitHub 起點清單</h3>
            <p>點一下完成的項目，幫自己留下清楚的開始。</p>
          </div>
          <div className="check-items">
            {checklist.map((item, index) => {
              const checked = doneChecks.includes(index);
              return (
                <button className={`check-item ${checked ? "is-checked" : ""}`} key={item} onClick={() => toggleCheck(index)}>
                  <span className="check-box">{checked ? "✓" : ""}</span>
                  <span>{item}</span>
                  <span className="check-item-arrow" aria-hidden="true">↗</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="faq-section" id="faq">
        <div className="faq-heading">
          <p className="section-kicker">STUCK SOMEWHERE? / 03</p>
          <h2>卡住很正常，<br /><em>先看這裡。</em></h2>
        </div>
        <div className="faq-list">
          <details open>
            <summary><span>01</span> 沒有收到驗證信怎麼辦？<b>＋</b></summary>
            <p>先檢查垃圾郵件或促銷分類；如果仍找不到，登入 GitHub 後前往 Settings → Emails，點選 Resend verification email 重新寄送。</p>
          </details>
          <details>
            <summary><span>02</span> username 可以之後再改嗎？<b>＋</b></summary>
            <p>可以修改，但改名後舊的個人頁網址可能需要更新。第一次設定時，建議選一個你願意長期使用、容易讓別人辨認的名稱。</p>
          </details>
          <details>
            <summary><span>03</span> 一定要付費才能使用 GitHub 嗎？<b>＋</b></summary>
            <p>不用。GitHub Free 已能滿足一般學習、建立 repository 與公開或私有專案的基本需求；之後有需要再升級即可。</p>
          </details>
          <details>
            <summary><span>04</span> 可以用 Google 帳號快速註冊嗎？<b>＋</b></summary>
            <p>可以。官方註冊頁提供 Continue with Google 選項，不過仍建議確認 GitHub 帳號的 Email 已完成驗證。</p>
          </details>
        </div>
      </section>

      <section className="final-cta">
        <div className="final-cta-mark">GH</div>
        <div>
          <p className="section-kicker">READY TO START?</p>
          <h2>現在就建立你的<br /><span>第一個 GitHub 帳號。</span></h2>
        </div>
        <a className="button button-lime" href={signupUrl} target="_blank" rel="noreferrer">
          前往 GitHub 註冊 <span aria-hidden="true">↗</span>
        </a>
      </section>

      <footer className="site-footer">
        <span>GitHub 帳號申請教學</span>
        <span className="footer-source">內容依 GitHub 官方文件整理 · <a href="https://docs.github.com/en/account-and-profile/how-tos/account-management/creating-an-account-on-github" target="_blank" rel="noreferrer">查看官方說明 ↗</a></span>
      </footer>
    </main>
  );
}
