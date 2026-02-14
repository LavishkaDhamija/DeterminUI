/**
 * Component Registry
 * Single Source of Truth for:
 * 1. Allowed components
 * 2. Allowed props
 * 3. Contract definition (backend authority)
 */

export const COMPONENTS = {
    Button: { allowedProps: ["label", "variant"] },
    Card: { allowedProps: ["title"] },
    Input: { allowedProps: ["label", "value", "placeholder"] },
    Table: { allowedProps: ["columns", "rows"] },
    Modal: { allowedProps: ["isOpen", "title"] },
    Sidebar: { allowedProps: ["items"] },
    Navbar: { allowedProps: ["title"] },
    Chart: { allowedProps: ["title", "type", "data"] }
};
