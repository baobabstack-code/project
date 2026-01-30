import React from "react";
import { render, screen } from "@testing-library/react";
import StarField from "../StarField";

// Mock debounce to execute immediately in tests
jest.mock("lodash.debounce", () => jest.fn((fn) => fn));

describe("StarField Component", () => {
  beforeEach(() => {
    // Reset window dimensions before each test
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 768,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render without crashing", () => {
    const { container } = render(<StarField />);
    expect(container).toBeInTheDocument();
  });

  it("should render children correctly", () => {
    render(
      <StarField>
        <div data-testid="child-content">Test Content</div>
      </StarField>
    );

    expect(screen.getByTestId("child-content")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("should render star field container with correct classes", () => {
    const { container } = render(<StarField />);
    const starFieldElement = container.querySelector(".star-field");

    expect(starFieldElement).toBeInTheDocument();
    expect(starFieldElement).toHaveClass("absolute", "inset-0", "pointer-events-none", "overflow-hidden", "z-0");
  });

  it("should generate stars on mount", () => {
    const { container } = render(<StarField />);
    const stars = container.querySelectorAll(".star");

    // StarField generates 130 stars: 100 regular + 25 bright + 5 super bright
    expect(stars.length).toBe(130);
  });

  it("should apply correct CSS properties to stars", () => {
    const { container } = render(<StarField />);
    const firstStar = container.querySelector(".star");

    expect(firstStar).toHaveStyle({
      position: "absolute",
    });

    // Check that animation properties are set
    const style = firstStar?.getAttribute("style");
    expect(style).toContain("left:");
    expect(style).toContain("top:");
    expect(style).toContain("width:");
    expect(style).toContain("height:");
    expect(style).toContain("animation-delay:");
    expect(style).toContain("animation-duration:");
    expect(style).toContain("--duration:");
  });

  it("should generate stars with varying properties", () => {
    const { container } = render(<StarField />);
    const stars = container.querySelectorAll(".star");

    const starProperties = Array.from(stars).map((star) => {
      const style = star.getAttribute("style") || "";
      return {
        left: style.match(/left:\s*([^;]+)/)?.[1],
        top: style.match(/top:\s*([^;]+)/)?.[1],
        width: style.match(/width:\s*([^;]+)/)?.[1],
      };
    });

    // Check that stars have different positions (randomness)
    const uniqueLeftPositions = new Set(starProperties.map((s) => s.left));
    const uniqueTopPositions = new Set(starProperties.map((s) => s.top));

    // With 130 stars, we should have many unique positions
    expect(uniqueLeftPositions.size).toBeGreaterThan(100);
    expect(uniqueTopPositions.size).toBeGreaterThan(100);
  });

  it("should have gradient overlays", () => {
    const { container } = render(<StarField />);
    const gradients = container.querySelectorAll(".bg-gradient-radial");

    // StarField has 2 radial gradients
    expect(gradients.length).toBeGreaterThanOrEqual(2);
  });

  it("should wrap children in a relative z-10 container", () => {
    const { container } = render(
      <StarField>
        <div data-testid="test-child">Child</div>
      </StarField>
    );

    const childWrapper = container.querySelector(".relative.z-10");
    expect(childWrapper).toBeInTheDocument();
    expect(childWrapper?.querySelector('[data-testid="test-child"]')).toBeInTheDocument();
  });

  it("should add event listener for window resize", () => {
    const addEventListenerSpy = jest.spyOn(window, "addEventListener");
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

    const { unmount } = render(<StarField />);

    expect(addEventListenerSpy).toHaveBeenCalledWith("resize", expect.any(Function));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith("resize", expect.any(Function));

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it("should be memoized to prevent unnecessary re-renders", () => {
    const StarFieldComponent = StarField;
    expect(StarFieldComponent.$$typeof).toBeDefined(); // React.memo components have this property
  });

  it("should generate stars with different brightness levels", () => {
    const { container } = render(<StarField />);
    const stars = container.querySelectorAll(".star");

    const brightnesses = Array.from(stars).map((star) => {
      const style = star.getAttribute("style") || "";
      const brightnessMatch = style.match(/brightness\(([^)]+)\)/);
      return brightnessMatch ? parseFloat(brightnessMatch[1]) : 1;
    });

    // Should have stars with different brightness values
    const uniqueBrightness = new Set(brightnesses);
    expect(uniqueBrightness.size).toBeGreaterThan(1);

    // Check that some stars have high brightness (super bright stars)
    const hasBrightStars = brightnesses.some((b) => b > 3);
    expect(hasBrightStars).toBe(true);
  });

  it("should apply correct animation duration fallback in CSS", () => {
    const { container } = render(<StarField />);
    const star = container.querySelector(".star");

    // Verify that the --duration CSS variable is set
    const style = star?.getAttribute("style");
    expect(style).toContain("--duration:");
    
    // The CSS animation property itself is set via the .star class in index.css
    // which has: animation: twinkle var(--duration, 2s) ease-in-out infinite;
  });
});
