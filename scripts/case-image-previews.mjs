import { mkdir, readdir, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const directories = [
  'aily-case',
  'dashboard-case',
  'laike-case',
  'miaoda-case',
  'qibao-case',
  'viz-case',
  'work-covers',
];

export default function caseImagePreviews() {
  return {
    name: 'case-image-previews',
    hooks: {
      'astro:config:setup': async ({ config, command }) => {
        if (command !== 'build' && command !== 'dev') return;
        const publicDir = fileURLToPath(config.publicDir);
        const jobs = [];

        for (const folder of directories) {
          const sourceDir = join(publicDir, folder);
          for (const file of await readdir(sourceDir, { recursive: true })) {
            if (!/\.(png|jpe?g|webp)$/i.test(file) || file.endsWith('-poster.jpg')) continue;
            jobs.push({
              source: join(sourceDir, file),
              output: join(publicDir, 'case-previews', folder, file + '.webp'),
            });
          }
        }

        await Promise.all(
          Array.from({ length: 4 }, async () => {
            for (let job = jobs.pop(); job; job = jobs.pop()) {
              const preview = await stat(job.output).catch((error) => {
                if (error.code !== 'ENOENT') throw error;
              });
              if (preview && preview.mtimeMs >= (await stat(job.source)).mtimeMs) continue;
              await mkdir(dirname(job.output), { recursive: true });
              await sharp(job.source)
                .autoOrient()
                .resize({ width: 1920, withoutEnlargement: true })
                .webp({ quality: 83 })
                .toFile(job.output);
            }
          }),
        );
      },
    },
  };
}
