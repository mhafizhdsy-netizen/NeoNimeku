/**
 * Artplayer Plugin for Picture-in-Picture Subtitle Support
 * This plugin renders subtitles on a canvas overlay when in PiP mode
 */

export default function artplayerPluginPipSubtitle(option = {}) {
  return (art) => {
    const {
      fontSize = 20,
      fontFamily = 'Arial, sans-serif',
      fontColor = '#FFFFFF',
      backgroundColor = 'rgba(0, 0, 0, 0.75)',
      padding = 10,
      borderRadius = 8,
      position = 'bottom', // 'top' or 'bottom'
    } = option;

    let canvas = null;
    let ctx = null;
    let currentSubtitle = '';
    let animationFrameId = null;
    let isPipMode = false;

    // Create canvas for subtitle rendering
    function createCanvas() {
      if (canvas) return;

      canvas = document.createElement('canvas');
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '1000';
      
      art.template.$video.parentElement.appendChild(canvas);
      ctx = canvas.getContext('2d');
      
      // Set canvas size to match video
      resizeCanvas();
    }

    function resizeCanvas() {
      if (!canvas || !art.template.$video) return;
      
      const video = art.template.$video;
      canvas.width = video.videoWidth || video.clientWidth;
      canvas.height = video.videoHeight || video.clientHeight;
    }

    function drawSubtitle() {
      if (!ctx || !canvas || !currentSubtitle || !isPipMode) {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
        return;
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set font
      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Measure text
      const lines = currentSubtitle.split('\n');
      const lineHeight = fontSize * 1.2;
      const totalHeight = lines.length * lineHeight + padding * 2;
      
      // Calculate position
      const x = canvas.width / 2;
      const y = position === 'bottom' 
        ? canvas.height - totalHeight / 2 - 20
        : totalHeight / 2 + 20;

      // Draw background for each line
      lines.forEach((line, index) => {
        const metrics = ctx.measureText(line);
        const textWidth = metrics.width;
        const lineY = y + (index - (lines.length - 1) / 2) * lineHeight;

        // Draw rounded rectangle background
        const bgX = x - textWidth / 2 - padding;
        const bgY = lineY - fontSize / 2 - padding / 2;
        const bgWidth = textWidth + padding * 2;
        const bgHeight = fontSize + padding;

        ctx.fillStyle = backgroundColor;
        ctx.beginPath();
        ctx.roundRect(bgX, bgY, bgWidth, bgHeight, borderRadius);
        ctx.fill();

        // Draw text
        ctx.fillStyle = fontColor;
        ctx.fillText(line, x, lineY);
      });

      // Continue animation
      animationFrameId = requestAnimationFrame(drawSubtitle);
    }

    // Monitor subtitle changes
    function onSubtitleChange() {
      // Monitor subtitle updates continuously
      const checkSubtitle = () => {
        const subtitleElement = art.template.$subtitle;
        if (subtitleElement) {
          const newSubtitle = subtitleElement.textContent || '';
          if (newSubtitle !== currentSubtitle) {
            currentSubtitle = newSubtitle;
            if (isPipMode) {
              drawSubtitle();
            }
          }
        }
        if (isPipMode) {
          requestAnimationFrame(checkSubtitle);
        }
      };

      // Also use MutationObserver as backup
      const subtitleElement = art.template.$subtitle;
      if (subtitleElement) {
        const observer = new MutationObserver(() => {
          currentSubtitle = subtitleElement.textContent || '';
          if (isPipMode) {
            drawSubtitle();
          }
        });

        observer.observe(subtitleElement, {
          childList: true,
          subtree: true,
          characterData: true,
        });
      }

      // Start continuous checking
      checkSubtitle();
    }

    // Monitor PiP mode
    function onPipChange() {
      const video = art.template.$video;
      
      video.addEventListener('enterpictureinpicture', () => {
        isPipMode = true;
        createCanvas();
        resizeCanvas();
        
        // Force show canvas in PiP
        if (canvas) {
          canvas.style.display = 'block';
        }
        
        // Start subtitle monitoring
        onSubtitleChange();
        drawSubtitle();
        
        console.log('PiP mode enabled - Subtitles rendering active');
      });

      video.addEventListener('leavepictureinpicture', () => {
        isPipMode = false;
        
        if (canvas) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          canvas.style.display = 'none';
        }
        
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
        
        console.log('PiP mode disabled');
      });
    }

    // Initialize
    art.on('ready', () => {
      createCanvas();
      if (canvas) {
        canvas.style.display = 'none'; // Hide initially
      }
      
      onPipChange();
      
      // Handle video resize
      art.on('resize', resizeCanvas);
      
      // Handle subtitle switch
      art.on('subtitleSwitch', () => {
        currentSubtitle = art.template.$subtitle?.textContent || '';
        if (isPipMode) {
          drawSubtitle();
        }
      });
      
      // Monitor subtitle updates
      art.on('subtitleUpdate', () => {
        currentSubtitle = art.template.$subtitle?.textContent || '';
        if (isPipMode) {
          drawSubtitle();
        }
      });
    });

    // Cleanup
    art.on('destroy', () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (canvas && canvas.parentElement) {
        canvas.parentElement.removeChild(canvas);
      }
    });

    return {
      name: 'artplayerPluginPipSubtitle',
    };
  };
}
