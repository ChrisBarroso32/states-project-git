# States Project — Manejo de estados en React

Proyecto de práctica para entender **cómo se maneja el estado en React** usando el ejemplo de un `perfil de usuario` que puede iniciar y cerrar sesión.

La idea es que la interfaz nunca cambia, pero la fuente del estado sí. Así se ve con claridad qué aporta cada enfoque y cuándo conviene usarlo.

---

## Ejemplo del Proyecto

Un componente `UserProfile` que muestra dos cosas distintas según el valor de `user`:

- Si `user` es `null` → mensaje "Please log in" + botón **Login**
- Si `user` tiene datos → saludo con nombre y email + botón **Logout**

```
user = null                    user = { name, email }

┌─────────────────────┐        ┌─────────────────────┐
│  Please log in      │        │  Welcome Chris !    │
│  [ Login ]          │   ⇄    │  Email: chris@...   │
│                     │        │  [ Logout ]         │
└─────────────────────┘        └─────────────────────┘
```

Todo el proyecto gira alrededor de responder: **¿dónde vive ese `user` y quién puede modificarlo?**

---

## Los tres enfoques

### 1. Estado local con `useState`

El estado vive dentro del propio `UserProfile`. Es la forma más simple y directa.

```jsx
const [user, setUser] = useState(null);

const login  = () => setUser({ name: "Chris", email: "chris@example.com" });
const logout = () => setUser(null);
```

**Ventaja:** cero configuración, cero dependencias.
**Límite:** solo ese componente conoce al usuario.

En el código actual este bloque quedó comentado dentro de `UserProfile.jsx` como referencia.

---

### 2. Estado global con Context API

El estado sube a un proveedor que envuelve a los componentes `hijos`. Cualquier componente heredado de este puede leerlo sin recibir **props**.

**`src/contexts/user-context-provider.jsx`**

```jsx
export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login  = () => setUser({ name: "Chris", email: "chris@example.com" });
  const logout = () => setUser(null);

  const contextValue = { user, login, logout };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
```

**Consumo desde cualquier componente:**

```jsx
const { user, login, logout } = useContext(UserContext);
```

Estructura necesaria en `App.jsx`:

```jsx
<UserContextProvider>
  <UserProfile />
</UserContextProvider>
```

---

### 3. Estado global con Zustand

Zustand saca el estado en cualquier parte de un proyecto en React. El store es un módulo que se importa donde se necesite.

**`src/zustand/useUserStore.js`**

```js
import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  login:  () => set({ user: { name: "Chris", email: "chris@example.com" } }),
  logout: () => set({ user: null }),
}));
```

**Consumo:**

```jsx
const { user, login, logout } = useUserStore();
```

**Ventajas:** sin provider, menos código y permite suscribirse solo a la porción del estado que interesa.

---
## Estructura del proyecto

```
states-project/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   ├── components/
│   │   └── UserProfile.jsx
│   ├── contexts/
│   │   └── user-context-provider.jsx      # enfoque 2 (referencia)
│   └── zustand/
│       └── useUserStore.js                # enfoque 3 (activo)
├── package.json
└── vite.config.js
```

---
## Instalación y ejecución

```bash
npm install zustand // Instalación de Zustand
npm run dev // Ejecución del servidor local
```

La app queda disponible en `http://localhost:5173`.

---

## Referencia

Proyecto basado en el video: https://youtu.be/qqqyUTTS-9g
