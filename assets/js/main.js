/* =========================================
   009 — INLINE. ALIGN.
   Interactive playground
========================================= */

// 01. HELPER

const $ = (selector) => document.querySelector(selector);

// 02. COPY CODE BUTTONS

document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
        const target = document.getElementById(button.dataset.copy);

        if (!target) return;

        const text = target.innerText;
        const originalText = button.textContent;

        try {
            await navigator.clipboard.writeText(text);

            button.textContent = "COPIED ✓";

            setTimeout(() => {
                button.textContent = originalText;
            }, 1300);
        } catch {
            // Fallback for browsers where Clipboard API is unavailable.
            const selection = window.getSelection();
            const range = document.createRange();

            range.selectNodeContents(target);
            selection.removeAllRanges();
            selection.addRange(range);

            button.textContent = "SELECTED — COPY";

            setTimeout(() => {
                selection.removeAllRanges();
                button.textContent = originalText;
            }, 1800);
        }
    });
});

// 03. PLAYGROUND ELEMENTS

const component = $("#component");
const previewIcon = $("#previewIcon");

const align = $("#align");
const gapControl = $("#gapControl");
const iconSize = $("#iconSize");
const textSize = $("#textSize");
const direction = $("#direction");
const iconShape = $("#iconShape");

const gapValue = $("#gapValue");
const iconValue = $("#iconValue");
const textValue = $("#textValue");

const generated = $("#generated");

// 04. DEFAULT SETTINGS

const defaults = {
    align: "center",
    gap: 14,
    iconSize: 42,
    textSize: 15,
    direction: "row",
    iconShape: "rounded",
};

// 05. UPDATE PLAYGROUND

function updatePlayground() {
    const settings = {
        align: align.value,
        gap: Number(gapControl.value),
        iconSize: Number(iconSize.value),
        textSize: Number(textSize.value),
        direction: direction.value,
        iconShape: iconShape.value,
    };

    component.style.alignItems = settings.align;
    component.style.gap = `${settings.gap}px`;
    component.style.flexDirection = settings.direction;

    previewIcon.style.width = `${settings.iconSize}px`;
    previewIcon.style.height = `${settings.iconSize}px`;

    const shapes = {
        rounded: "12px",
        circle: "50%",
        square: "0px",
    };

    previewIcon.style.borderRadius = shapes[settings.iconShape];

    component.querySelector("strong").style.fontSize = `${settings.textSize}px`;

    gapValue.textContent = `${settings.gap}px`;
    iconValue.textContent = `${settings.iconSize}px`;
    textValue.textContent = `${settings.textSize}px`;

    generated.textContent = `.notification {
    display: flex;
    flex-direction: ${settings.direction};
    align-items: ${settings.align};
    gap: ${settings.gap}px;
}

.notification__icon {
    width: ${settings.iconSize}px;
    height: ${settings.iconSize}px;
    flex-shrink: 0;
    border-radius: ${shapes[settings.iconShape]};
}

.notification__content {
    flex: 1;
    min-width: 0;
}

.notification__title {
    font-size: ${settings.textSize}px;
}

.notification__badge {
    flex-shrink: 0;
}`;
}

// 06. LISTEN TO CONTROL CHANGES

[align, gapControl, iconSize, textSize, direction, iconShape].forEach(
    (control) => {
        control.addEventListener("input", updatePlayground);
        control.addEventListener("change", updatePlayground);
    },
);

// 07. RESET SETTINGS

$("#reset").addEventListener("click", () => {
    align.value = defaults.align;
    gapControl.value = defaults.gap;
    iconSize.value = defaults.iconSize;
    textSize.value = defaults.textSize;
    direction.value = defaults.direction;
    iconShape.value = defaults.iconShape;

    updatePlayground();
});

// 08. INITIALIZE

updatePlayground();
