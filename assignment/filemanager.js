const fs = require('fs').promises;
const path = require('path');

const [,, command, ...args] = process.argv;

async function main() {
  try {
    switch (command) {

      case 'read': {
        const data = await fs.readFile(args[0], 'utf8');
        console.log(data);
        break;
      }

      case 'write': {
        await fs.writeFile(args[0], args.slice(1).join(' '), 'utf8');
        console.log('File written successfully');
        break;
      }

      case 'copy': {
        await fs.copyFile(args[0], args[1]);
        console.log('File copied successfully');
        break;
      }

      case 'delete': {
        await fs.unlink(args[0]);
        console.log('File deleted successfully');
        break;
      }

      case 'list': {
        const files = await fs.readdir(args[0] || '.');
        files.forEach(f => console.log(f));
        break;
      }

      default:
        console.log(`
Commands:
  read <file>
  write <file> <content>
  copy <source> <destination>
  delete <file>
  list <directory>
`);
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

main();
