// ==========================================================================
// THE ISLE OF SEVEN GEMS — Official Movie Promo Portal Logic
// ==========================================================================

function switchTab(targetId) {
  const tabBtns = document.querySelectorAll('.nav-tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(b => {
    if (b.getAttribute('data-target') === targetId) {
      b.classList.add('active');
      b.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    } else {
      b.classList.remove('active');
    }
  });

  tabPanes.forEach(p => {
    if (p.id === targetId) {
      p.classList.add('active');
    } else {
      p.classList.remove('active');
    }
  });

  const targetPane = document.getElementById(targetId);
  if (targetPane) {
    targetPane.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Tab Navigation with Mobile Smooth Scroll
  const tabBtns = document.querySelectorAll('.nav-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      switchTab(targetId);
    });
  });

  // Copy to Clipboard Buttons
  document.querySelectorAll('.btn-copy').forEach(btn => {
    btn.addEventListener('click', () => {
      const promptText = btn.getAttribute('data-prompt') || 
                         btn.closest('.prompt-card')?.querySelector('.prompt-text')?.innerText;
      if (promptText) {
        navigator.clipboard.writeText(promptText.trim()).then(() => {
          const originalText = btn.textContent;
          btn.textContent = '✓ Copied to Clipboard!';
          btn.style.background = '#10b981';
          btn.style.color = '#fff';
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.color = '';
          }, 2000);
        }).catch(err => {
          console.error('Copy failed: ', err);
        });
      }
    });
  });

  // Prompt Filter Buttons
  const filterBtns = document.querySelectorAll('.prompt-filter-btn');
  const promptCards = document.querySelectorAll('.prompt-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      promptCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
  });

  // Collapsible Acts
  document.querySelectorAll('.act-header').forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      if (body) {
        const isHidden = body.style.display === 'none';
        body.style.display = isHidden ? 'block' : 'none';
      }
    });
  });

  // Back to Top Button
  const btnTop = document.querySelector('.btn-top');
  if (btnTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        btnTop.style.display = 'flex';
      } else {
        btnTop.style.display = 'none';
      }
    });
    btnTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
