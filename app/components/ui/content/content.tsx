import { curvedContainer, content } from "./content.css";

export const Content: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className={curvedContainer}>
      <main className={content}>{children}</main>
    </div>
  );
};
