import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>
        Movie Not Found
      </h2>
      <p style={{ marginBottom: "24px", color: "#666" }}>
        Could not find the requested movie.
      </p>
      <Link
        href="/"
        style={{
          padding: "12px 24px",
          backgroundColor: "#000",
          color: "#fff",
          borderRadius: "4px",
          textDecoration: "none",
        }}
      >
        Return Home
      </Link>
    </div>
  );
}
