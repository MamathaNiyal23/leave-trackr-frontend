import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button component test", ()=>{
    it("should render the button with correct label as login", () =>{
        render(<Button label="login"/>);

        const button = screen.getByText(/login/i);
        expect(button).toBeInTheDocument();
    });
});

