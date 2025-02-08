import { FC } from 'react';
import { css } from '@emotion/react';
import { colors } from '@/styles/constants';

const Footer: FC = () => {
  return (
    <footer css={footer}>
      <small data-testid="footerText">
        このアプリは{' '}
        <a
          css={resasLink}
          href="https://yumemi-frontend-engineer-codecheck-api.vercel.app/api-doc"
        >
          ゆめみフロントエンドコーディング試験 API
        </a>{' '}
        のデータを使用しています。
      </small>
    </footer>
  );
};

const footer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 8px;
  background-color: ${colors.primaryBgColor};
`;

const resasLink = css`
  color: ${colors.linkColor};

  :hover {
    text-decoration: underline solid ${colors.linkColor};
    text-underline-offset: 2px;
  }
`;

export default Footer;
