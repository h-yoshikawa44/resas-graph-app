import { FC, useState, useEffect } from 'react';
import Highcharts, { SeriesOptionsType, Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

type Props = {
  data: SeriesOptionsType[];
};

const loadHighchartsModules = async (callback: () => void) => {
  // 2025/02/08時点の公式ドキュメントのやり方だと、hugncharts のモジュール使用時に TypeError: Cannot read properties of undefined (reading 'AST') になるので
  // Issue にある回避策で設定する
  // https://github.com/highcharts/highcharts-react/issues/502#issuecomment-2531518313
  Promise.all([
    import('highcharts/modules/exporting'),
    import('highcharts/modules/no-data-to-display'),
    import('highcharts/highcharts-more'),
  ]).then(callback);
};

const PopulationGraph: FC<Props> = ({ data }) => {
  const [options, setOptions] = useState<Options | null>(null);

  useEffect(() => {
    loadHighchartsModules(() => {
      const customOptions: Options = {
        title: {
          text: '人口遷移グラフ',
        },
        subtitle: {
          text: '選択した都道府県のデータが表示されます。',
        },
        yAxis: {
          title: {
            align: 'high',
            offset: 0,
            text: '人口数',
            rotation: 0,
            y: -20,
          },
        },
        xAxis: {
          title: {
            align: 'high',
            text: '年度',
            x: 30,
            y: -20,
          },
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
        },
        series: data,
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 600,
              },
              chartOptions: {
                legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom',
                },
              },
            },
          ],
        },
        lang: {
          noData: '表示するデータがありません',
          viewFullscreen: '全画面表示',
          printChart: 'グラフを印刷する',
          downloadPNG: 'PNGとしてダウンロード',
          downloadJPEG: 'JPRGとしてダウンロード',
          downloadPDF: 'PDFとしてダウンロード',
          downloadSVG: 'SVGとしてダウンロード',
        },
        noData: {
          style: {
            fontWeight: 'bold',
            fontSize: '16px',
          },
        },
      };
      setOptions(customOptions);
    });
  }, [data]);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PopulationGraph;
