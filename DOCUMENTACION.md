# Documentación PAC 2 - Imágenes y Animación Web

## 1. Optimización de Imágenes

Para mejorar el rendimiento (WPO) y la experiencia de usuario, se ha implementado un proceso automatizado de optimización de imágenes utilizando la librería **Sharp**.

El objetivo ha sido convertir todos los activos gráficos a formatos de nueva generación (**WebP**), reduciendo drásticamente su peso sin sacrificar calidad visual.

### Tabla de Resultados

| Nombre Imagen                | Formato Antiguo | Formato Nuevo | Peso Original (KB) | Peso Nuevo (KB) | Mejora (%) |
| ---------------------------- | --------------- | ------------- | ------------------ | --------------- | ---------- |
| got-dubrovnik.jpg            | .jpg            | .webp         | 64.12              | 34.26           | 46.58%     |
| got-murallas.jpg             | .jpg            | .webp         | 55.71              | 27.95           | 49.83%     |
| got-fortaleza.jpg            | .jpg            | .webp         | 99.00              | 62.74           | 36.62%     |
| hobbiton-detalle1.jpg        | .jpg            | .webp         | 101.71             | 62.32           | 38.72%     |
| hobbiton-detalle2.jpg        | .jpg            | .webp         | 108.32             | 61.48           | 43.24%     |
| hobbiton-nueva-zelanda.jpg   | .jpg            | .webp         | 111.83             | 70.87           | 36.63%     |
| interstellar-glaciar1jpg.jpg | .jpg            | .webp         | 82.02              | 44.39           | 45.88%     |
| interstellar-glaciar2.jpg    | .jpg            | .webp         | 81.49              | 48.12           | 40.95%     |
| interstellar-islandia.jpg    | .jpg            | .webp         | 108.11             | 67.34           | 37.71%     |
| matrix-calle.jpg             | .jpg            | .webp         | 123.19             | 81.05           | 34.21%     |
| matrix-sydney.jpg            | .jpg            | .webp         | 52.06              | 24.47           | 53.00%     |
| imagenppal.png               | .png            | .webp         | 1139.61            | 52.06           | 95.43%     |
| matrix-fuente.jpg            | .jpg            | .webp         | 189.68             | 98.47           | 48.08%     |

### Análisis

Los resultados muestran una reducción media del peso superior al **40%**. El caso más destacado es la imagen de portada (`imagenppal.png`), que ha pasado de **1.1 MB a solo 52 KB**, consiguiendo una optimización del **95.43%**. Esto impacta directamente en la métrica _Largest Contentful Paint (LCP)_, acelerando la carga inicial de la página.

## 2. Estrategias Responsive

Se han implementado las tres estrategias clave del Módulo 3:

1.  **Resolution Switching:** Uso generalizado de imágenes optimizadas que se adaptan al ancho del contenedor.
2.  **Dirección de Arte (Art Direction):** En la página _El Señor de los Anillos_, se utiliza la etiqueta `<picture>` para mostrar un detalle cuadrado (crop) en móviles y una panorámica completa en escritorio, asegurando que el sujeto principal (la casa hobbit) sea siempre visible.
3.  **Densidad de Pantalla:** Las imágenes WebP generadas mantienen una calidad suficiente para verse nítidas en pantallas de alta densidad.

## 3. Animación y SVG

En la portada se han integrado:

- **SVG Animado:** Un icono de "claqueta de cine" creado vectorialmente que incluye una animación continua (`@keyframes balanceo`) realizada exclusivamente con CSS.
- **Clip-path:** La imagen principal presenta un recorte creativo en forma de escudo/pico mediante la propiedad `clip-path`, aportando dinamismo al diseño sin necesidad de editar el archivo de imagen original.

## 4. Accesibilidad (WCAG 2.0 AA)

Se han aplicado mejoras críticas de accesibilidad:

- **Skip Link:** Se ha añadido un enlace "Saltar al contenido principal" visible al tabular, permitiendo a usuarios de teclado evitar la navegación repetitiva.
- **Semántica:** Uso correcto de encabezados y textos alternativos (`alt`) descriptivos en todas las imágenes.
- **Funcionalidad:** La nueva galería Lightbox es completamente accesible vía teclado (se puede cerrar con `ESC` y el foco se gestiona correctamente).

## 5. Funcionalidad Extra

Se ha desarrollado un **Lightbox (Galería Modal)** con JavaScript vainilla. Permite visualizar las imágenes en alta resolución con un efecto de fondo desenfocado (`backdrop-filter`) y transiciones suaves, mejorando la interacción del usuario sin dependencias externas.
