## 🔍 JDK = JRE (JVM + libs) + Compiler

Java code cannot run without the JVM (Java Virtual Machine)

| Component                          | Purpose                               | Contains                         |
| ---------------------------------- | ------------------------------------- | -------------------------------- |
| **JVM**                            | Runs the bytecode (`.class` files)    | Just the runtime engine          |
| **JRE (Java Runtime Environment)** | Used to **run** Java applications     | JVM + Core libraries (`rt.jar`)  |
| **JDK (Java Development Kit)**     | Used to **develop** and run Java apps | JRE + Compiler (`javac`) + Tools |

## 🔁 Can JVM be installed separately?
- 👉 Officially, No.
- You don’t install the JVM alone directly from Oracle or OpenJDK. You install the JRE or JDK, and they include the JVM.
    - If you only want to run Java programs: install JRE.
    - If you want to develop and run Java programs (e.g., using javac, IntelliJ, Spring Boot): install JDK.
- `As of Java 9 and above, JRE is no longer distributed separately by Oracle — you install the JDK, and it provides both dev tools and runtime (JVM + libraries)`.