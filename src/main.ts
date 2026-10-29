import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';

interface QuizQuestion {
  id: number;
  question: string;
  options: { label: string; score: number }[];
}

interface ThreatItem {
  icon: string;
  title: string;
  description: string;
  level: 'alto' | 'medio' | 'critico';
}

interface TipItem {
  icon: string;
  title: string;
  description: string;
}

interface Stat {
  value: string;
  label: string;
  sub: string;
}

interface FaqItem {
  q: string;
  a: string;
}

@Component({
  selector: 'app-root',
  template: `
    <!-- ===== NAVBAR ===== -->
    <nav
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      [class]="scrolled()
        ? 'bg-ink-900/85 backdrop-blur-lg border-b border-cyber-500/15 py-3'
        : 'bg-transparent py-5'"
    >
      <div class="max-w-7xl mx-auto px-5 flex items-center justify-between">
        <a href="#hero" class="flex items-center gap-2.5 group">
          <div
            class="w-9 h-9 rounded-xl bg-gradient-to-br from-cyber-400 to-accent-500 flex items-center justify-center font-bold text-ink-900 text-lg shadow-lg shadow-cyber-500/30 group-hover:scale-110 transition-transform"
          >
            C
          </div>
          <span class="font-bold text-lg tracking-tight text-white"
            >Cyber<span class="text-cyber-400">Check</span></span
          >
        </a>

        <!-- Desktop links -->
        <div class="hidden md:flex items-center gap-7 text-sm text-slate-300">
          <a
            *ngFor="let link of navLinks"
            [href]="'#' + link.id"
            class="hover:text-cyber-400 transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-cyber-400 after:transition-all hover:after:w-full"
            [class.nav-link-active]="activeSection() === link.id"
            >{{ link.label }}</a
          >
        </div>

        <div class="flex items-center gap-3">
          <a
            href="#evaluacion"
            class="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyber-400 to-accent-500 text-ink-900 font-semibold text-sm hover:shadow-lg hover:shadow-cyber-500/40 hover:-translate-y-0.5 transition-all"
          >
            Evaluar ahora
          </a>
          <button
            class="md:hidden text-slate-200 p-2"
            (click)="mobileOpen.set(!mobileOpen())"
            aria-label="Menú"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" [attr.d]="mobileOpen() ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div
        class="md:hidden overflow-hidden transition-all duration-300"
        [class.max-h-0]="!mobileOpen()"
        [class.max-h-96]="mobileOpen()"
      >
        <div class="px-5 pt-4 pb-6 flex flex-col gap-4 bg-ink-900/95 backdrop-blur-lg border-b border-cyber-500/10">
          <a
            *ngFor="let link of navLinks"
            [href]="'#' + link.id"
            (click)="mobileOpen.set(false)"
            class="text-slate-300 hover:text-cyber-400 transition-colors py-1"
            >{{ link.label }}</a
          >
          <a
            href="#evaluacion"
            (click)="mobileOpen.set(false)"
            class="text-center px-5 py-2.5 rounded-full bg-gradient-to-r from-cyber-400 to-accent-500 text-ink-900 font-semibold text-sm"
            >Evaluar ahora</a
          >
        </div>
      </div>
    </nav>

    <!-- ===== HERO ===== -->
    <section id="hero" class="relative min-h-screen flex items-center overflow-hidden grid-bg">
      <!-- Background image overlay -->
      <div class="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/33158875/pexels-photo-33158875.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Interfaz digital futurista de ciberseguridad"
          class="w-full h-full object-cover opacity-20"
        />
        <div class="absolute inset-0 bg-gradient-to-br from-ink-900 via-ink-900/90 to-ink-800/70"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-ink-900/60"></div>
      </div>

      <!-- Floating blobs -->
      <div
        class="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-cyber-500/20 blur-3xl animate-pulse-slow"
      ></div>
      <div
        class="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-accent-500/15 blur-3xl animate-pulse-slow"
      ></div>

      <div class="relative z-10 max-w-7xl mx-auto px-5 pt-28 pb-20 w-full">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left -->
          <div class="animate-fade-in-up">
            <div
              class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyber-500/10 border border-cyber-500/30 text-cyber-300 text-sm font-medium mb-6"
            >
              <span class="w-2 h-2 rounded-full bg-accent-400 animate-pulse"></span>
              Campaña de concientación 2026
            </div>

            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-white mb-6">
              Tu seguridad digital<br />
              <span class="text-gradient">empieza por ti</span>
            </h1>

            <p class="text-lg text-slate-400 max-w-xl mb-8 leading-relaxed">
              CyberCheck te ayuda a evaluar tus hábitos de ciberseguridad, identificar riesgos
              ocultos y recibir recomendaciones personalizadas con inteligencia artificial.
            </p>

            <div class="flex flex-wrap gap-4">
              <a
                href="#evaluacion"
                class="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-cyber-400 to-accent-500 text-ink-900 font-bold hover:shadow-xl hover:shadow-cyber-500/40 hover:-translate-y-0.5 transition-all"
              >
                Hacer evaluación gratuita
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5-5 5M6 12h12" />
                </svg>
              </a>
              <a
                href="#amenazas"
                class="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-slate-600 text-slate-200 font-semibold hover:border-cyber-400 hover:text-cyber-400 transition-all"
              >
                Conocer las amenazas
              </a>
            </div>

            <!-- Trust row -->
            <div class="flex items-center gap-6 mt-10 text-sm text-slate-500">
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6 7.7 9.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z" clip-rule="evenodd" />
                </svg>
                100% gratuito
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-.3.7L12 11.4V17a1 1 0 01-1.4.9l-2-1A1 1 0 018 16v-4.6L3.3 6.7A1 1 0 013 6V4z" clip-rule="evenodd" />
                </svg>
                Sin registro
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 1l3 6 6 .9-4.5 4.3 1 6.1L10 15.8 4.5 18.3l1-6.1L1 7.9 7 7l3-6z" clip-rule="evenodd" />
                </svg>
                Recomendaciones IA
              </div>
            </div>
          </div>

          <!-- Right: visual card -->
          <div class="relative animate-fade-in-up" style="animation-delay: 0.2s">
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-tr from-cyber-500/20 to-accent-500/20 rounded-3xl blur-2xl"></div>
              <div class="relative bg-ink-800/80 backdrop-blur-xl border border-cyber-500/20 rounded-3xl p-8 shadow-2xl animate-float">
                <div class="flex items-center justify-between mb-6">
                  <div class="flex items-center gap-2">
                    <div class="w-3 h-3 rounded-full bg-danger-500"></div>
                    <div class="w-3 h-3 rounded-full bg-warning-500"></div>
                    <div class="w-3 h-3 rounded-full bg-accent-500"></div>
                  </div>
                  <span class="text-xs text-slate-500 font-mono">cybercheck://scan</span>
                </div>

                <!-- Mock scan -->
                <div class="space-y-4">
                  <div>
                    <div class="flex justify-between text-sm mb-2">
                      <span class="text-slate-400">Contraseñas</span>
                      <span class="text-danger-400 font-semibold">Débil</span>
                    </div>
                    <div class="h-2 rounded-full bg-ink-700 overflow-hidden">
                      <div class="h-full w-3/4 rounded-full bg-gradient-to-r from-danger-500 to-warning-500"></div>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between text-sm mb-2">
                      <span class="text-slate-400">Verificación 2FA</span>
                      <span class="text-warning-400 font-semibold">Parcial</span>
                    </div>
                    <div class="h-2 rounded-full bg-ink-700 overflow-hidden">
                      <div class="h-full w-1/2 rounded-full bg-gradient-to-r from-warning-500 to-accent-400"></div>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between text-sm mb-2">
                      <span class="text-slate-400">Actualizaciones</span>
                      <span class="text-accent-400 font-semibold">Óptimo</span>
                    </div>
                    <div class="h-2 rounded-full bg-ink-700 overflow-hidden">
                      <div class="h-full w-full rounded-full bg-gradient-to-r from-accent-500 to-cyber-400"></div>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between text-sm mb-2">
                      <span class="text-slate-400">Wi-Fi seguro</span>
                      <span class="text-danger-400 font-semibold">Riesgo</span>
                    </div>
                    <div class="h-2 rounded-full bg-ink-700 overflow-hidden">
                      <div class="h-full w-1/4 rounded-full bg-gradient-to-r from-danger-500 to-danger-400"></div>
                    </div>
                  </div>
                </div>

                <div class="mt-6 p-4 rounded-xl bg-cyber-500/10 border border-cyber-500/20">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-cyber-500/20 flex items-center justify-center text-cyber-300">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.7 3.5a2 2 0 014.6 0 2 2 0 003 2.4 2 2 0 011 3 2 2 0 000 3.8 2 2 0 01-1 3 2 2 0 01-3 2.4 2 2 0 00-4.6 0 2 2 0 01-3-2.4 2 2 0 00-1-3 2 2 0 010-3.8 2 2 0 011-3 2 2 0 013-2.4z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4" />
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm font-semibold text-white">IA recomienda:</p>
                      <p class="text-xs text-slate-400">Activa 2FA en tus cuentas bancarias hoy.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-slate-500 animate-pulse">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7-7-7M19 8l-7 7-7-7" />
        </svg>
      </div>
    </section>

    <!-- ===== DIVIDER ===== -->
    <div class="section-divider"></div>

    <!-- ===== STATS ===== -->
    <section class="py-16 bg-ink-800 relative">
      <div class="max-w-7xl mx-auto px-5">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            *ngFor="let s of stats; let i = index"
            class="reveal text-center"
            style="transition-delay: {{ i * 100 }}ms"
          >
            <div class="text-4xl lg:text-5xl font-extrabold text-gradient mb-2">{{ s.value }}</div>
            <div class="text-white font-semibold">{{ s.label }}</div>
            <div class="text-sm text-slate-500">{{ s.sub }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== DIVIDER ===== -->
    <div class="section-divider"></div>

    <!-- ===== AMENAZAS ===== -->
    <section id="amenazas" class="py-24 relative overflow-hidden bg-ink-900">
      <div class="absolute top-0 right-0 w-96 h-96 bg-danger-500/5 rounded-full blur-3xl"></div>
      <div class="max-w-7xl mx-auto px-5 relative">
        <div class="max-w-2xl mx-auto mb-16 reveal">
          <div class="flex items-center gap-3 mb-3">
            <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-cyber-500/15 text-cyber-400 font-mono font-bold text-sm">01</span>
            <span class="text-cyber-400 font-mono text-sm">// amenazas comunes</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">
            Riesgos que enfrentas cada día
          </h2>
          <p class="text-slate-400">
            La mayoría de los ataques cibernéticos aprovechan hábitos cotidianos que pasan
            desapercibidos. Conócelos para protegerte.
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            *ngFor="let t of threats; let i = index"
            class="reveal group bg-ink-800 border border-slate-700/50 rounded-2xl p-6 hover:border-cyber-500/40 hover:bg-ink-700/50 transition-all hover:-translate-y-1"
            style="transition-delay: {{ i * 80 }}ms"
          >
            <div class="flex items-start justify-between mb-5">
              <div
                class="w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-all group-hover:scale-110"
                [class]="levelBg(t.level)"
              >
                {{ t.icon }}
              </div>
              <span
                class="text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wide"
                [class]="levelBadge(t.level)"
                >{{ t.level }}</span
              >
            </div>
            <h3 class="text-lg font-bold text-white mb-2">{{ t.title }}</h3>
            <p class="text-slate-400 text-sm leading-relaxed">{{ t.description }}</p>
          </div>
        </div>

        <!-- Interactive tool CTA -->
        <div class="reveal mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            (click)="openPwdModal()"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyber-400 to-accent-500 text-ink-900 font-semibold text-sm hover:shadow-lg hover:shadow-cyber-500/40 hover:-translate-y-0.5 transition-all"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Probar el verificador de contraseñas
          </button>
          <span class="text-slate-500 text-sm">Herramienta interactiva</span>
        </div>
      </div>
    </section>

    <!-- ===== DIVIDER ===== -->
    <div class="section-divider"></div>

    <!-- ===== EVALUACIÓN / QUIZ ===== -->
    <section id="evaluacion" class="py-24 bg-ink-800 relative overflow-hidden">
      <div class="absolute inset-0 grid-bg opacity-30"></div>
      <div class="max-w-3xl mx-auto px-5 relative">
        <div class="mb-12 reveal">
          <div class="flex items-center gap-3 mb-3">
            <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-500/15 text-accent-400 font-mono font-bold text-sm">02</span>
            <span class="text-accent-400 font-mono text-sm">// evaluación interactiva</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">
            ¿Qué tan segura es tu vida digital?
          </h2>
          <p class="text-slate-400">
            Responde {{ quizQuestions.length }} preguntas rápidas y recibe un análisis personalizado
            al instante.
          </p>
        </div>

        <!-- Quiz card -->
        <div class="reveal bg-ink-900/80 backdrop-blur-xl border border-cyber-500/20 rounded-3xl p-8 shadow-2xl">
          <!-- Step dots -->
          <div class="flex items-center justify-center gap-2 mb-6">
            <span
              *ngFor="let q of quizQuestions; let i = index"
              class="h-2 rounded-full transition-all duration-300"
              [class]="i < answers().length ? 'w-8 bg-cyber-400' : i === currentQ() && !quizDone() ? 'w-4 bg-cyber-500/50' : 'w-2 bg-ink-700'"
            ></span>
          </div>

          <!-- Progress bar -->
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm text-slate-400 font-mono"
              >Pregunta {{ currentQ() + 1 }} / {{ quizQuestions.length }}</span
            >
            <span class="text-sm font-semibold text-cyber-400"
              >{{ quizProgress() }}% completado</span
            >
          </div>
          <div class="h-1.5 rounded-full bg-ink-700 overflow-hidden mb-8">
            <div
              class="h-full rounded-full bg-gradient-to-r from-cyber-400 to-accent-500 transition-all duration-500"
              [style.width.%]="quizProgress()"
            ></div>
          </div>

          <!-- Question -->
          <div *ngIf="!quizDone()" class="animate-fade-in">
            <h3 class="text-xl font-bold text-white mb-6">{{ quizQuestions[currentQ()].question }}</h3>
            <div class="space-y-3">
              <button
                *ngFor="let opt of quizQuestions[currentQ()].options; let i = index"
                (click)="selectAnswer(opt.score)"
                class="w-full text-left px-5 py-4 rounded-xl border border-slate-700 bg-ink-800 hover:border-cyber-400 hover:bg-cyber-500/10 transition-all flex items-center gap-4 group"
              >
                <span
                  class="w-8 h-8 rounded-lg border border-slate-600 group-hover:border-cyber-400 flex items-center justify-center text-slate-400 group-hover:text-cyber-400 text-sm font-bold transition-all"
                  >{{ i + 1 }}</span
                >
                <span class="text-slate-200 group-hover:text-white transition-colors">{{ opt.label }}</span>
              </button>
            </div>
          </div>

          <!-- Result -->
          <div *ngIf="quizDone()" class="text-center animate-fade-in">
            <div
              class="w-24 h-24 rounded-full mx-auto mb-5 flex items-center justify-center text-4xl"
              [class]="resultIconBg()"
            >
              {{ resultIcon() }}
            </div>
            <h3 class="text-2xl font-bold text-white mb-2">{{ resultTitle() }}</h3>
            <p class="text-slate-400 mb-6 max-w-md mx-auto">{{ resultDescription() }}</p>

            <!-- Score bar -->
            <div class="max-w-xs mx-auto mb-8">
              <div class="flex justify-between text-sm mb-2">
                <span class="text-slate-400">Tu puntuación</span>
                <span class="font-bold" [class]="resultTextClass()">{{ quizScore() }} / {{ maxScore }} puntos</span>
              </div>
              <div class="h-3 rounded-full bg-ink-700 overflow-hidden">
                <div
                  class="h-full rounded-full transition-all duration-1000"
                  [class]="resultBarClass()"
                  [style.width.%]="(quizScore() / maxScore) * 100"
                ></div>
              </div>
            </div>

            <!-- Recommendations -->
            <div class="text-left bg-ink-800/60 rounded-2xl p-6 mb-6">
              <h4 class="font-bold text-white mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-cyber-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.7 3.5a2 2 0 014.6 0 2 2 0 003 2.4 2 2 0 011 3 2 2 0 000 3.8 2 2 0 01-1 3 2 2 0 01-3 2.4 2 2 0 00-4.6 0 2 2 0 01-3-2.4 2 2 0 00-1-3 2 2 0 010-3.8 2 2 0 011-3 2 2 0 013-2.4z" />
                </svg>
                Recomendaciones de la IA
              </h4>
              <ul class="space-y-3">
                <li *ngFor="let rec of recommendations()" class="flex items-start gap-3 text-sm text-slate-300">
                  <svg class="w-5 h-5 text-accent-400 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.7-9.3a1 1 0 00-1.4-1.4L9 10.6 7.7 9.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  {{ rec }}
                </li>
              </ul>
            </div>

            <button
              (click)="resetQuiz()"
              class="px-6 py-3 rounded-full border border-cyber-500/40 text-cyber-300 font-semibold hover:bg-cyber-500/10 transition-all"
            >
              Volver a evaluar
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== DIVIDER ===== -->
    <div class="section-divider"></div>

    <!-- ===== CÓMO FUNCIONA ===== -->
    <section id="como-funciona" class="py-24 relative overflow-hidden bg-ink-900">
      <!-- Futuristic background -->
      <div class="absolute inset-0 grid-bg opacity-20"></div>
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyber-500/10 rounded-full blur-3xl"></div>

      <div class="max-w-7xl mx-auto px-5 relative">
        <div class="max-w-2xl mx-auto mb-20 reveal">
          <div class="flex items-center gap-3 mb-3">
            <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-cyber-500/15 text-cyber-400 font-mono font-bold text-sm">03</span>
            <span class="text-cyber-400 font-mono text-sm">// proceso</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">Cómo funciona CyberCheck</h2>
          <p class="text-slate-400">
            Tres pasos simples para transformar tus hábitos digitales y blindar tu vida online.
          </p>
        </div>

        <!-- Three step cards with images -->
        <div class="grid md:grid-cols-3 gap-6">
          <!-- Step 1 -->
          <div
            class="reveal group relative bg-ink-800/60 border border-slate-700/40 rounded-2xl overflow-hidden hover:border-cyber-500/40 transition-all hover:-translate-y-1"
          >
            <!-- Image -->
            <div class="relative h-44 overflow-hidden">
              <img
                src="https://images.pexels.com/photos/37709121/pexels-photo-37709121.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Cuestionario de seguridad digital"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-ink-800 via-ink-800/30 to-transparent"></div>
              <span
                class="absolute top-4 left-4 w-10 h-10 rounded-xl bg-gradient-to-br from-cyber-400 to-accent-500 text-ink-900 text-lg font-bold flex items-center justify-center shadow-lg"
                >1</span
              >
            </div>
            <!-- Content -->
            <div class="p-6">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-2xl">📝</span>
                <span class="text-cyber-400 font-mono text-xs">// paso 01</span>
              </div>
              <h3 class="text-lg font-bold text-white mb-2">Responde un cuestionario breve</h3>
              <p class="text-slate-400 text-sm leading-relaxed">
                Un breve cuestionario sobre tus hábitos digitales: contraseñas, redes,
                dispositivos y comportamiento online. Solo te toma 3 minutos.
              </p>
            </div>
          </div>

          <!-- Step 2 -->
          <div
            class="reveal group relative bg-ink-800/60 border border-slate-700/40 rounded-2xl overflow-hidden hover:border-cyber-500/40 transition-all hover:-translate-y-1"
            style="transition-delay: 120ms"
          >
            <div class="relative h-44 overflow-hidden">
              <img
                src="https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Evaluación de hábitos digitales"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-ink-800 via-ink-800/30 to-transparent"></div>
              <span
                class="absolute top-4 left-4 w-10 h-10 rounded-xl bg-gradient-to-br from-cyber-400 to-accent-500 text-ink-900 text-lg font-bold flex items-center justify-center shadow-lg"
                >2</span
              >
            </div>
            <div class="p-6">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-2xl">🤖</span>
                <span class="text-cyber-400 font-mono text-xs">// paso 02</span>
              </div>
              <h3 class="text-lg font-bold text-white mb-2">Obtén una evaluación de tus hábitos</h3>
              <p class="text-slate-400 text-sm leading-relaxed">
                Nuestra inteligencia artificial analiza tus respuestas, identifica tus puntos
                débiles y calcula tu nivel de exposición a riesgos digitales.
              </p>
            </div>
          </div>

          <!-- Step 3 -->
          <div
            class="reveal group relative bg-ink-800/60 border border-slate-700/40 rounded-2xl overflow-hidden hover:border-cyber-500/40 transition-all hover:-translate-y-1"
            style="transition-delay: 240ms"
          >
            <div class="relative h-44 overflow-hidden">
              <img
                src="https://images.pexels.com/photos/8566470/pexels-photo-8566470.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Recomendaciones de seguridad con IA"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-ink-800 via-ink-800/30 to-transparent"></div>
              <span
                class="absolute top-4 left-4 w-10 h-10 rounded-xl bg-gradient-to-br from-cyber-400 to-accent-500 text-ink-900 text-lg font-bold flex items-center justify-center shadow-lg"
                >3</span
              >
            </div>
            <div class="p-6">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-2xl">🛡️</span>
                <span class="text-cyber-400 font-mono text-xs">// paso 03</span>
              </div>
              <h3 class="text-lg font-bold text-white mb-2">Descubre recomendaciones para mejorar</h3>
              <p class="text-slate-400 text-sm leading-relaxed">
                Recibe un plan de acción personalizado con pasos concretos para fortalecer
                tu seguridad de inmediato y proteger lo que más te importa.
              </p>
            </div>
          </div>
        </div>

        <!-- Process banner image -->
        <div class="mt-16 reveal">
          <div class="relative rounded-3xl overflow-hidden border border-cyber-500/20 shadow-2xl">
            <img
              src="https://images.pexels.com/photos/5473956/pexels-photo-5473956.jpeg?auto=compress&cs=tinysrgb&w=1400"
              alt="Concientización de seguridad digital"
              class="w-full h-72 lg:h-96 object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/50 to-ink-900/10"></div>
            <div class="absolute bottom-0 left-0 right-0 p-8">
              <p class="text-white font-semibold text-lg max-w-lg">
                "La seguridad no es un producto, sino un proceso continuo que comienza con
                la concientización."
              </p>
              <p class="text-cyber-400 text-sm mt-2">— Principio de CyberCheck</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== DIVIDER ===== -->
    <div class="section-divider"></div>

    <!-- ===== TIPS ===== -->
    <section id="consejos" class="py-24 bg-ink-800 relative overflow-hidden">
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl"></div>
      <div class="max-w-7xl mx-auto px-5 relative">
        <div class="max-w-2xl mx-auto mb-16 reveal">
          <div class="flex items-center gap-3 mb-3">
            <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-accent-500/15 text-accent-400 font-mono font-bold text-sm">04</span>
            <span class="text-accent-400 font-mono text-sm">// buenos hábitos</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">
            Consejos para tu día a día
          </h2>
          <p class="text-slate-400">
            Acciones concretas que puedes aplicar hoy mismo para reducir tu exposición.
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            *ngFor="let tip of tips; let i = index"
            class="reveal group relative bg-ink-900/60 border border-slate-700/40 rounded-2xl p-6 hover:border-accent-500/40 transition-all hover:-translate-y-1"
            style="transition-delay: {{ i * 80 }}ms"
          >
            <div class="flex items-center gap-3 mb-4">
              <div class="text-3xl transition-transform group-hover:scale-110">{{ tip.icon }}</div>
              <span class="text-xs font-mono text-slate-600">0{{ i + 1 }}</span>
            </div>
            <h3 class="font-bold text-white mb-2">{{ tip.title }}</h3>
            <p class="text-slate-400 text-sm leading-relaxed">{{ tip.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== DIVIDER ===== -->
    <div class="section-divider"></div>

    <!-- ===== TESTIMONIOS ===== -->
    <section class="py-24 relative overflow-hidden bg-ink-900">
      <div class="max-w-7xl mx-auto px-5">
        <div class="max-w-2xl mx-auto mb-16 reveal">
          <div class="flex items-center gap-3 mb-3">
            <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-cyber-500/15 text-cyber-400 font-mono font-bold text-sm">05</span>
            <span class="text-cyber-400 font-mono text-sm">// comunidad</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">
            Lo que dicen quienes ya probaron
          </h2>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div
            *ngFor="let t of testimonials; let i = index"
            class="reveal bg-ink-800 border border-slate-700/50 rounded-2xl p-7 hover:border-cyber-500/30 transition-all"
            style="transition-delay: {{ i * 120 }}ms"
          >
            <div class="flex gap-1 mb-4">
              <svg *ngFor="let s of [1,2,3,4,5]" class="w-5 h-5 text-warning-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 1l3 6 6 .9-4.5 4.3 1 6.1L10 15.8 4.5 18.3l1-6.1L1 7.9 7 7l3-6z" />
              </svg>
            </div>
            <p class="text-slate-300 mb-6 leading-relaxed italic">"{{ t.quote }}"</p>
            <div class="flex items-center gap-3">
              <div
                class="w-11 h-11 rounded-full bg-gradient-to-br from-cyber-500 to-accent-500 flex items-center justify-center text-ink-900 font-bold"
              >
                {{ t.initial }}
              </div>
              <div>
                <div class="font-semibold text-white text-sm">{{ t.name }}</div>
                <div class="text-slate-500 text-xs">{{ t.role }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== DIVIDER ===== -->
    <div class="section-divider"></div>

    <!-- ===== FAQ ===== -->
    <section id="faq" class="py-24 bg-ink-800 relative overflow-hidden">
      <div class="max-w-3xl mx-auto px-5">
        <div class="mb-12 reveal">
          <div class="flex items-center gap-3 mb-3">
            <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-cyber-500/15 text-cyber-400 font-mono font-bold text-sm">06</span>
            <span class="text-cyber-400 font-mono text-sm">// preguntas frecuentes</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">
            Resolvemos tus dudas
          </h2>
        </div>

        <div class="space-y-3">
          <div
            *ngFor="let item of faqs; let i = index"
            class="reveal bg-ink-900/60 border border-slate-700/40 rounded-xl overflow-hidden"
            style="transition-delay: {{ i * 60 }}ms"
          >
            <button
              class="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-ink-700/40 transition-colors"
              (click)="toggleFaq(i)"
            >
              <span class="font-semibold text-white pr-4">{{ item.q }}</span>
              <svg
                class="w-5 h-5 text-cyber-400 shrink-0 transition-transform duration-300"
                [class.rotate-180]="faqOpen() === i"
                fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              class="overflow-hidden transition-all duration-300"
              [class.max-h-0]="faqOpen() !== i"
              [class.max-h-60]="faqOpen() === i"
            >
              <p class="px-6 pb-5 text-slate-400 text-sm leading-relaxed">{{ item.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== DIVIDER ===== -->
    <div class="section-divider"></div>

    <!-- ===== CTA FINAL ===== -->
    <section class="py-24 relative overflow-hidden bg-ink-900">
      <div class="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/5866051/pexels-photo-5866051.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Interfaz holográfica de ciberseguridad"
          class="w-full h-full object-cover opacity-15"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-900/80 to-ink-900"></div>
      </div>
      <div class="max-w-3xl mx-auto px-5 text-center relative reveal">
        <div
          class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyber-500/10 border border-cyber-500/30 text-cyber-300 text-sm font-medium mb-6"
        >
          <span class="w-2 h-2 rounded-full bg-accent-400 animate-pulse"></span>
          Tu primer paso hacia una vida digital segura
        </div>
        <h2 class="text-3xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
          No esperes a ser la<br />
          <span class="text-gradient">próxima víctima</span>
        </h2>
        <p class="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
          Evalúa tus hábitos, recibe recomendaciones con IA y refuerza tu seguridad digital
          en menos de 3 minutos. Gratis y sin registro.
        </p>
        <a
          href="#evaluacion"
          class="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-cyber-400 to-accent-500 text-ink-900 font-bold text-lg hover:shadow-2xl hover:shadow-cyber-500/40 hover:-translate-y-0.5 transition-all"
        >
          Comenzar evaluación
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5-5 5M6 12h12" />
          </svg>
        </a>
      </div>
    </section>

    <!-- ===== FOOTER ===== -->
    <footer class="bg-ink-900 border-t border-cyber-500/10 pt-16 pb-8">
      <div class="max-w-7xl mx-auto px-5">
        <div class="grid md:grid-cols-4 gap-10 mb-12">
          <div class="md:col-span-2">
            <div class="flex items-center gap-2.5 mb-4">
              <div
                class="w-9 h-9 rounded-xl bg-gradient-to-br from-cyber-400 to-accent-500 flex items-center justify-center font-bold text-ink-900 text-lg"
              >
                C
              </div>
              <span class="font-bold text-lg text-white"
                >Cyber<span class="text-cyber-400">Check</span></span
              >
            </div>
            <p class="text-slate-400 text-sm max-w-sm leading-relaxed">
              Plataforma de concientación sobre ciberseguridad que ayuda a las personas a
              proteger su vida digital con evaluaciones, consejos y recomendaciones
              personalizadas mediante IA.
            </p>
          </div>

          <div>
            <h4 class="font-semibold text-white mb-4 text-sm">Navegación</h4>
            <ul class="space-y-2.5">
              <li *ngFor="let link of navLinks">
                <a [href]="'#' + link.id" class="text-slate-400 hover:text-cyber-400 text-sm transition-colors">{{ link.label }}</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="font-semibold text-white mb-4 text-sm">Recursos</h4>
            <ul class="space-y-2.5">
              <li><a href="#evaluacion" class="text-slate-400 hover:text-cyber-400 text-sm transition-colors">Evaluación de seguridad</a></li>
              <li><a href="#consejos" class="text-slate-400 hover:text-cyber-400 text-sm transition-colors">Consejos prácticos</a></li>
              <li><a href="#faq" class="text-slate-400 hover:text-cyber-400 text-sm transition-colors">Preguntas frecuentes</a></li>
              <li><a href="#amenazas" class="text-slate-400 hover:text-cyber-400 text-sm transition-colors">Amenazas comunes</a></li>
            </ul>
          </div>
        </div>

        <div class="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-slate-500 text-sm">
            © 2026 CyberCheck · Campaña de concientación sobre ciberseguridad
          </p>
          <div class="flex items-center gap-4">
            <span class="text-slate-500 text-sm flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-accent-400 animate-pulse"></span>
              Hecho con foco en la seguridad de todos
            </span>
          </div>
        </div>
      </div>
    </footer>

    <!-- ===== PASSWORD CHECKER MODAL ===== -->
    <div
      *ngIf="pwdModalOpen()"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in"
      (click)="closePwdModal($event)"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-ink-900/80 backdrop-blur-sm"></div>

      <!-- Modal card -->
      <div
        class="relative w-full max-w-lg bg-ink-800 border border-cyber-500/25 rounded-3xl p-8 shadow-2xl glow-cyber animate-fade-in-up"
        (click)="$event.stopPropagation()"
      >
        <!-- Close button -->
        <button
          class="absolute top-4 right-4 w-9 h-9 rounded-full bg-ink-700 text-slate-400 hover:text-white hover:bg-ink-600 flex items-center justify-center transition-all"
          (click)="closePwdModalButton()"
          aria-label="Cerrar"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Header -->
        <div class="flex items-center gap-3 mb-2">
          <div class="w-11 h-11 rounded-xl bg-cyber-500/15 flex items-center justify-center text-cyber-400">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-bold text-white">Verificador de contraseñas</h3>
            <p class="text-slate-500 text-sm">Escribe una contraseña para analizar su fortaleza</p>
          </div>
        </div>

        <!-- Input -->
        <div class="mt-6 relative">
          <input
            [type]="pwdVisible() ? 'text' : 'password'"
            [value]="pwdInput()"
            (input)="onPwdInput($event)"
            placeholder="Escribe tu contraseña..."
            class="w-full px-4 py-3.5 pr-12 rounded-xl bg-ink-900 border border-slate-700 text-white placeholder-slate-600 focus:border-cyber-400 focus:outline-none transition-colors font-mono"
          />
          <button
            class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyber-400 transition-colors"
            (click)="pwdVisible.set(!pwdVisible())"
            aria-label="Mostrar/ocultar"
          >
            <svg *ngIf="!pwdVisible()" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.5 12C4 7.5 7.7 5 12 5s8 2.5 9.5 7c-1.5 4.5-5.2 7-9.5 7s-8-2.5-9.5-7z" />
            </svg>
            <svg *ngIf="pwdVisible()" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 3l18 18M10.6 10.6a3 3 0 004.2 4.2M9.9 5.1C10.6 5 11.3 5 12 5c4.3 0 8 2.5 9.5 7-.5 1.6-1.4 3-2.6 4.2M6.1 6.1C4 7.3 2.5 9.4 2.5 12c1.5 4.5 5.2 7 9.5 7 1 0 2-.1 2.9-.4" />
            </svg>
          </button>
        </div>

        <!-- Strength bar -->
        <div *ngIf="pwdInput().length > 0" class="mt-5">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-slate-400">Nivel de fortaleza</span>
            <span class="text-sm font-bold" [class]="pwdStrengthLabelClass()">{{ pwdStrengthLabel() }}</span>
          </div>
          <div class="flex gap-1.5">
            <div
              *ngFor="let s of [1,2,3,4,5]"
              class="h-2 flex-1 rounded-full transition-all duration-300"
              [class]="s <= pwdStrength() ? pwdBarClass() : 'bg-ink-700'"
            ></div>
          </div>
        </div>

        <!-- Analysis -->
        <div *ngIf="pwdInput().length > 0" class="mt-6 space-y-2.5">
          <div *ngFor="let check of pwdChecks()" class="flex items-center gap-3 text-sm">
            <div
              class="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors"
              [class]="check.passed ? 'bg-accent-500/20 text-accent-400' : 'bg-ink-700 text-slate-600'"
            >
              <svg *ngIf="check.passed" class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z" clip-rule="evenodd" />
              </svg>
              <svg *ngIf="!check.passed" class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" d="M6 18L18 6" />
              </svg>
            </div>
            <span [class]="check.passed ? 'text-slate-200' : 'text-slate-500'">{{ check.label }}</span>
          </div>
        </div>

        <!-- Tips -->
        <div *ngIf="pwdInput().length > 0 && pwdStrength() < 4" class="mt-5 p-4 rounded-xl bg-cyber-500/10 border border-cyber-500/20">
          <p class="text-xs text-cyber-300 flex items-start gap-2">
            <svg class="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 22a10 10 0 100-20 10 10 0 000 20z" />
            </svg>
            {{ pwdTip() }}
          </p>
        </div>

        <!-- Generate button -->
        <button
          (click)="generatePassword()"
          class="mt-6 w-full px-5 py-3 rounded-xl bg-gradient-to-r from-cyber-400 to-accent-500 text-ink-900 font-semibold text-sm hover:shadow-lg hover:shadow-cyber-500/30 transition-all flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Generar contraseña segura
        </button>

        <!-- Privacy note -->
        <p class="mt-4 text-center text-xs text-slate-600">
          Tu contraseña no se guarda ni se envía. Todo el análisis ocurre en tu navegador.
        </p>
      </div>
    </div>

    <!-- ===== BACK TO TOP ===== -->
    <button
      class="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-gradient-to-br from-cyber-400 to-accent-500 text-ink-900 font-bold flex items-center justify-center shadow-lg shadow-cyber-500/30 hover:scale-110 transition-all"
      [class.opacity-0]="!scrolled()"
      [class.pointer-events-none]="!scrolled()"
      [class.translate-y-4]="!scrolled()"
      (click)="scrollTop()"
      aria-label="Volver arriba"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7 7 7M5 18l7-7 7 7" />
      </svg>
    </button>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class App implements OnInit, OnDestroy {
  scrolled = signal(false);
  mobileOpen = signal(false);
  faqOpen = signal<number | null>(0);
  activeSection = signal('hero');

  // Quiz state
  currentQ = signal(0);
  answers = signal<number[]>([]);
  quizDone = signal(false);
  quizScore = signal(0);
  maxScore = 0;

  // Password checker modal state
  pwdModalOpen = signal(false);
  pwdInput = signal('');
  pwdVisible = signal(false);
  pwdStrength = signal(0);
  pwdChecks = signal<{ label: string; passed: boolean }[]>([]);

  navLinks = [
    { label: 'Inicio', id: 'hero' },
    { label: 'Amenazas', id: 'amenazas' },
    { label: 'Evaluación', id: 'evaluacion' },
    { label: 'Cómo funciona', id: 'como-funciona' },
    { label: 'Consejos', id: 'consejos' },
    { label: 'FAQ', id: 'faq' },
  ];

  stats: Stat[] = [
    { value: '2.365', label: 'Ataques diarios', sub: 'por persona promedio' },
    { value: '82%', label: 'Fugas por contraseñas débiles', sub: 'en 2025' },
    { value: '<3 min', label: 'Tiempo de evaluación', sub: 'resultado inmediato' },
    { value: '100%', label: 'Recomendaciones IA', sub: 'personalizadas' },
  ];

  threats: ThreatItem[] = [
    {
      icon: '🔑',
      title: 'Contraseñas débiles',
      description: 'Usar la misma clave en múltiples sitios o combinaciones predecibles como "123456" facilita el acceso no autorizado a tus cuentas.',
      level: 'critico',
    },
    {
      icon: '🎣',
      title: 'Phishing',
      description: 'Correos o mensajes que suplantan identidades conocidas para robar tus credenciales y datos financieros con enlaces falsos.',
      level: 'alto',
    },
    {
      icon: '📡',
      title: 'Wi-Fi público inseguro',
      description: 'Conectarte a redes abiertas sin VPN permite que terceros intercepten tu información sensible mientras navegas.',
      level: 'alto',
    },
    {
      icon: '📱',
      title: 'Apps sin actualizar',
      description: 'Las aplicaciones desactualizadas contienen vulnerabilidades conocidas que los atacantes explotan para acceder a tu dispositivo.',
      level: 'medio',
    },
    {
      icon: '🔓',
      title: 'Falta de verificación 2FA',
      description: 'Sin un segundo factor de autenticación, basta con tu contraseña para que alguien tome control total de tu cuenta.',
      level: 'alto',
    },
    {
      icon: '💳',
      title: 'Estafas de comercio online',
      description: 'Tiendas falsas y ofertas irreales diseñadas para capturar los datos de tu tarjeta de crédito al momento del pago.',
      level: 'medio',
    },
  ];

  steps = [
    {
      icon: '📝',
      title: 'Responde la evaluación',
      description: 'Un breve cuestionario sobre tus hábitos digitales: contraseñas, redes, dispositivos y comportamiento online.',
    },
    {
      icon: '🤖',
      title: 'Análisis con IA',
      description: 'Nuestra inteligencia artificial identifica tus puntos débiles y calcula tu nivel de exposición a riesgos.',
    },
    {
      icon: '🛡️',
      title: 'Recibe recomendaciones',
      description: 'Obtén un plan de acción personalizado con pasos concretos para fortalecer tu seguridad de inmediato.',
    },
  ];

  tips: TipItem[] = [
    {
      icon: '🔐',
      title: 'Usa un gestor de contraseñas',
      description: 'Genera y almacena claves únicas y robustas para cada cuenta. Nunca reutilices la misma contraseña.',
    },
    {
      icon: '✅',
      title: 'Activa la verificación en 2 pasos',
      description: 'Añade una capa extra de protección en correo, redes sociales y, sobre todo, banca online.',
    },
    {
      icon: '🔄',
      title: 'Mantén todo actualizado',
      description: 'Sistema operativo, apps y navegador. Las actualizaciones corrigen fallos de seguridad descubiertos.',
    },
    {
      icon: '🔍',
      title: 'Verifica antes de hacer clic',
      description: 'Desconfía de enlaces y adjuntos inesperados. Comprueba siempre el remitente y la URL real.',
    },
    {
      icon: '🛜',
      title: 'Usa una VPN en redes públicas',
      description: 'Cifra tu conexión en cafés, aeropuertos y hoteles para evitar la interceptación de tus datos.',
    },
    {
      icon: '💾',
      title: 'Haz copias de seguridad',
      description: 'Guarda tus archivos importantes en la nube y en un disco externo para resistir ransomware.',
    },
    {
      icon: '👀',
      title: 'Revisa permisos de apps',
      description: 'Revoca accesos innecesarios a cámara, micrófono y ubicación desde los ajustes de tu dispositivo.',
    },
    {
      icon: '🔒',
      title: 'Navega solo por HTTPS',
      description: 'Busca el candado en la barra de direcciones antes de ingresar datos personales o pagos.',
    },
  ];

  testimonials = [
    {
      quote: 'Me di cuenta de que usaba la misma contraseña hacía 10 años. La evaluación me abrió los ojos en 2 minutos.',
      name: 'Laura Méndez',
      role: 'Diseñadora freelance',
      initial: 'L',
    },
    {
      quote: 'Las recomendaciones fueron claras y fáciles de seguir. Activé 2FA en todas mis cuentas el mismo día.',
      name: 'Carlos Rivas',
      role: 'Pequeño empresario',
      initial: 'C',
    },
    {
      quote: 'Creí que la ciberseguridad era solo para expertos. CyberCheck me demostró que cualquiera puede protegerse.',
      name: 'Ana Torres',
      role: 'Estudiante universitaria',
      initial: 'A',
    },
  ];

  faqs: FaqItem[] = [
    {
      q: '¿Necesito conocimientos técnicos para usar CyberCheck?',
      a: 'No. La evaluación está diseñada para cualquier persona, sin importar su nivel. Las preguntas son claras y las recomendaciones se explican en lenguaje sencillo.',
    },
    {
      q: '¿La evaluación es realmente gratuita?',
      a: 'Sí. No hay costo, ni registro, ni límite de uso. Puedes repetirla cuantas veces quieras para medir tu progreso.',
    },
    {
      q: '¿Cómo funciona la recomendación con IA?',
      a: 'A partir de tus respuestas, el sistema analiza patrones de riesgo y genera recomendaciones priorizadas según tu perfil de exposición, usando modelos de inteligencia artificial.',
    },
    {
      q: '¿Mis respuestas se guardan o comparten?',
      a: 'No. La evaluación se procesa en tu navegador. No recopilamos datos personales ni almacenamos tus respuestas.',
    },
    {
      q: '¿Con qué frecuencia debo repetir la evaluación?',
      a: 'Recomendamos repetirla cada 3 meses o cuando cambies de dispositivo, red o hábitos digitales importantes.',
    },
  ];

  quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: '¿Cuántas de tus cuentas comparten la misma contraseña?',
      options: [
        { label: 'Ninguna, cada una tiene su clave única', score: 3 },
        { label: 'Algunas pocas comparten la misma', score: 2 },
        { label: 'La mayoría usa la misma', score: 1 },
        { label: 'Todas usan la misma contraseña', score: 0 },
      ],
    },
    {
      id: 2,
      question: '¿Tienes activada la verificación en dos pasos (2FA)?',
      options: [
        { label: 'En todas mis cuentas importantes', score: 3 },
        { label: 'Solo en el correo y el banco', score: 2 },
        { label: 'En una o dos cuentas', score: 1 },
        { label: 'No sé qué es o no la uso', score: 0 },
      ],
    },
    {
      id: 3,
      question: '¿Con qué frecuencia actualizas tus aplicaciones y sistema operativo?',
      options: [
        { label: 'Automáticamente, en cuanto salen', score: 3 },
        { label: 'Cuando me acuerdo, cada pocas semanas', score: 2 },
        { label: 'Rara vez, lo pospongo bastante', score: 1 },
        { label: 'Nunca actualizo', score: 0 },
      ],
    },
    {
      id: 4,
      question: '¿Qué haces al conectarte a un Wi-Fi público (café, aeropuerto)?',
      options: [
        { label: 'Uso VPN siempre', score: 3 },
        { label: 'Evito ingresar datos sensibles', score: 2 },
        { label: 'Navego con normalidad', score: 1 },
        { label: 'Hago compras y banca online sin protección', score: 0 },
      ],
    },
    {
      id: 5,
      question: 'Cuando recibes un correo con un enlace o adjunto inesperado, ¿qué haces?',
      options: [
        { label: 'Verifico el remitente antes de hacer clic', score: 3 },
        { label: 'Lo abro si parece confiable', score: 2 },
        { label: 'Suelo hacer clic sin revisar mucho', score: 1 },
        { label: 'Abro todo sin dudar', score: 0 },
      ],
    },
    {
      id: 6,
      question: '¿Tienes copias de seguridad de tus archivos importantes?',
      options: [
        { label: 'Sí, en la nube y disco externo', score: 3 },
        { label: 'Solo en la nube', score: 2 },
        { label: 'Solo en el dispositivo', score: 1 },
        { label: 'No tengo copia de seguridad', score: 0 },
      ],
    },
  ];

  private scrollListener!: () => void;
  private observer!: IntersectionObserver;
  private sectionObserver!: IntersectionObserver;

  quizProgress = computed(() => {
    const answered = this.answers().length;
    return Math.round((answered / this.quizQuestions.length) * 100);
  });

  recommendations = computed<string[]>(() => {
    const s = this.quizScore();
    const max = this.maxScore;
    const ratio = s / max;
    const recs: string[] = [];

    if (ratio < 0.4) {
      recs.push('Cambia de inmediato todas tus contraseñas por claves únicas y robustas, y usa un gestor de contraseñas.');
      recs.push('Activa la verificación en dos pasos (2FA) en el correo, redes sociales y banca online.');
      recs.push('Instala un antivirus confiable y ejecuta un análisis completo de tus dispositivos.');
    } else if (ratio < 0.7) {
      recs.push('Extiende el uso de 2FA a todas tus cuentas importantes, no solo las principales.');
      recs.push('Configura actualizaciones automáticas en sistema operativo y aplicaciones.');
      recs.push('Revisa y revoca los permisos de las apps que no usas habitualmente.');
    } else {
      recs.push('Mantén tus excelentes hábitos y revisa tu seguridad cada 3 meses con CyberCheck.');
      recs.push('Considera usar una VPN en todas tus conexiones fuera de casa.');
      recs.push('Educa a tu familia sobre phishing y contraseñas para multiplicar el impacto.');
    }

    recs.push('Repite esta evaluación tras aplicar los cambios para medir tu progreso.');
    return recs;
  });

  ngOnInit() {
    this.maxScore = this.quizQuestions.length * 3;

    this.scrollListener = () => this.scrolled.set(window.scrollY > 40);
    window.addEventListener('scroll', this.scrollListener, { passive: true });

    // Reveal-on-scroll observer
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.12 }
    );
    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach((el) => this.observer.observe(el));
    }, 50);

    // Active section observer for navbar
    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    setTimeout(() => {
      this.navLinks.forEach((link) => {
        const el = document.getElementById(link.id);
        if (el) this.sectionObserver.observe(el);
      });
    }, 50);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollListener);
    this.observer?.disconnect();
    this.sectionObserver?.disconnect();
  }

  selectAnswer(score: number) {
    const current = this.currentQ();
    const currentAnswers = this.answers();
    const updated = [...currentAnswers];
    updated[current] = score;
    this.answers.set(updated);
    this.quizScore.set(updated.reduce((a, b) => a + b, 0));

    if (current < this.quizQuestions.length - 1) {
      this.currentQ.set(current + 1);
    } else {
      this.quizDone.set(true);
    }
  }

  resetQuiz() {
    this.currentQ.set(0);
    this.answers.set([]);
    this.quizScore.set(0);
    this.quizDone.set(false);
  }

  toggleFaq(i: number) {
    this.faqOpen.set(this.faqOpen() === i ? null : i);
  }

  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --- Password checker modal ---
  openPwdModal() {
    this.pwdModalOpen.set(true);
  }

  closePwdModal(event: Event) {
    if (event.target === event.currentTarget) {
      this.resetPwdModal();
    }
  }

  closePwdModalButton() {
    this.resetPwdModal();
  }

  resetPwdModal() {
    this.pwdModalOpen.set(false);
    this.pwdInput.set('');
    this.pwdVisible.set(false);
    this.pwdStrength.set(0);
    this.pwdChecks.set([]);
  }

  onPwdInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.pwdInput.set(input.value);
    this.analyzePassword(input.value);
  }

  analyzePassword(pwd: string) {
    const checks = [
      { label: 'Al menos 8 caracteres', passed: pwd.length >= 8 },
      { label: 'Contiene minúsculas y mayúsculas', passed: /[a-z]/.test(pwd) && /[A-Z]/.test(pwd) },
      { label: 'Contiene números', passed: /\d/.test(pwd) },
      { label: 'Contiene símbolos especiales', passed: /[^a-zA-Z0-9]/.test(pwd) },
      { label: 'No es una contraseña común', passed: !['123456', 'password', '123456789', 'qwerty', 'abc123', '111111', '12345678', 'password1', 'iloveyou', 'admin'].includes(pwd.toLowerCase()) },
    ];
    this.pwdChecks.set(checks);
    this.pwdStrength.set(checks.filter((c) => c.passed).length);
  }

  pwdStrengthLabel(): string {
    const s = this.pwdStrength();
    if (s <= 1) return 'Muy débil';
    if (s === 2) return 'Débil';
    if (s === 3) return 'Aceptable';
    if (s === 4) return 'Fuerte';
    return 'Excelente';
  }

  pwdStrengthLabelClass(): string {
    const s = this.pwdStrength();
    if (s <= 1) return 'text-danger-400';
    if (s === 2) return 'text-warning-400';
    if (s === 3) return 'text-cyber-400';
    if (s === 4) return 'text-accent-400';
    return 'text-accent-400';
  }

  pwdBarClass(): string {
    const s = this.pwdStrength();
    if (s <= 1) return 'bg-danger-500';
    if (s === 2) return 'bg-warning-500';
    if (s === 3) return 'bg-cyber-500';
    if (s === 4) return 'bg-accent-500';
    return 'bg-gradient-to-r from-accent-500 to-cyber-400';
  }

  pwdTip(): string {
    const s = this.pwdStrength();
    const checks = this.pwdChecks();
    if (s <= 1) return 'Esta contraseña se puede descifrar en segundos. Añade mayúsculas, números y símbolos, y usa al menos 12 caracteres.';
    if (s === 2) return 'Aún es vulnerable. Incorpora símbolos especiales y aumenta la longitud para mayor protección.';
    if (s === 3) return 'Es aceptable, pero puedes reforzarla: añade símbolos especiales o aumenta la longitud por encima de 12 caracteres.';
    if (s === 4) return 'Es una contraseña fuerte. Para máxima seguridad, considera usar más de 16 caracteres o un gestor de contraseñas.';
    return 'Excelente contraseña. No la reutilices en otras cuentas y considérala única para cada servicio.';
  }

  generatePassword() {
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const symbs = '!@#$%^&*()_+-=[]{}';
    const all = lower + upper + nums + symbs;
    let pwd = '';
    // Guarantee at least one of each type
    pwd += lower[Math.floor(Math.random() * lower.length)];
    pwd += upper[Math.floor(Math.random() * upper.length)];
    pwd += nums[Math.floor(Math.random() * nums.length)];
    pwd += symbs[Math.floor(Math.random() * symbs.length)];
    for (let i = 0; i < 12; i++) {
      pwd += all[Math.floor(Math.random() * all.length)];
    }
    pwd = pwd.split('').sort(() => Math.random() - 0.5).join('');
    this.pwdInput.set(pwd);
    this.pwdVisible.set(true);
    this.analyzePassword(pwd);
  }

  // --- Threat level helpers ---
  levelBg(level: string): string {
    switch (level) {
      case 'critico':
        return 'bg-danger-500/15 text-danger-400';
      case 'alto':
        return 'bg-warning-500/15 text-warning-400';
      default:
        return 'bg-cyber-500/15 text-cyber-400';
    }
  }

  levelBadge(level: string): string {
    switch (level) {
      case 'critico':
        return 'bg-danger-500/20 text-danger-400';
      case 'alto':
        return 'bg-warning-500/20 text-warning-400';
      default:
        return 'bg-cyber-500/20 text-cyber-400';
    }
  }

  // --- Quiz result helpers ---
  resultIcon(): string {
    const ratio = this.quizScore() / this.maxScore;
    if (ratio >= 0.8) return '🛡️';
    if (ratio >= 0.5) return '⚠️';
    return '🚨';
  }

  resultIconBg(): string {
    const ratio = this.quizScore() / this.maxScore;
    if (ratio >= 0.8) return 'bg-accent-500/15';
    if (ratio >= 0.5) return 'bg-warning-500/15';
    return 'bg-danger-500/15';
  }

  resultTitle(): string {
    const ratio = this.quizScore() / this.maxScore;
    if (ratio >= 0.8) return '¡Excelente seguridad digital!';
    if (ratio >= 0.5) return 'Vas por buen camino';
    return 'Tu seguridad necesita atención';
  }

  resultDescription(): string {
    const ratio = this.quizScore() / this.maxScore;
    if (ratio >= 0.8)
      return 'Tus hábitos digitales son sólidos. Mantente alerta y sigue las recomendaciones para perfeccionar tu protección.';
    if (ratio >= 0.5)
      return 'Tienes bases de seguridad, pero hay puntos clave que debes reforzar. Revisa las recomendaciones a continuación.';
    return 'Tu exposición es alta. Te recomendamos aplicar las acciones sugeridas a continuación lo antes posible.';
  }

  resultTextClass(): string {
    const ratio = this.quizScore() / this.maxScore;
    if (ratio >= 0.8) return 'text-accent-400';
    if (ratio >= 0.5) return 'text-warning-400';
    return 'text-danger-400';
  }

  resultBarClass(): string {
    const ratio = this.quizScore() / this.maxScore;
    if (ratio >= 0.8) return 'bg-gradient-to-r from-accent-500 to-cyber-400';
    if (ratio >= 0.5) return 'bg-gradient-to-r from-warning-500 to-accent-400';
    return 'bg-gradient-to-r from-danger-500 to-warning-500';
  }
}

bootstrapApplication(App);
