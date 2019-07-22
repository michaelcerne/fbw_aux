import { Injectable } from '@angular/core';
import { ElectronService } from '../providers/electron.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private VALID_STATUS_COMMANDS = ['TH', 'BR', 'ST'];
  public serialPort;
  public parser;
  public ports: Array<any>;
  public state = false;
  public ready = false;
  public status = {};
  public dateNow: number;
  public heartbeat: number;

  constructor(private electronService: ElectronService) {
    setInterval(this.updateStatus.bind(this), 100);
  }

  private handleError(err) {
    console.error('<DataService>', err);
  }

  public updatePorts() {
    return this.electronService.serialPort.list((err, ports) => {
      if (err) {
        this.handleError(err);
      }
      this.ports = ports;
      return this.ports;
    });
  }

  public connect(comName: string) {
    if (this.state) {
      this.close();
    }
    this.serialPort = new this.electronService.serialPort(comName, {
      parity: 'odd'
    });
    this.parser = this.serialPort.pipe(new this.electronService.serialPort.parsers.Readline({delimiter:'\n'}))
    this.serialPort.on('open', () => {
      this.state = this.serialPort.isOpen;
    });
    this.parser.on('data', this.onData.bind(this));
  }

  public open() {
    this.serialPort.open();
  }

  public close() {
    this.ready = false;
    this.serialPort.close();
  }

  get lastPort(): string {
    return localStorage['lastPort'] || '';
  }

  set lastPort(value: string) {
    localStorage['lastPort'] = value;
  }

  public write(data: string) {
    console.log(`Write: ${data}`);
    this.serialPort.write(data);
  }

  public updateStatus() {
    this.dateNow = +new Date;
    if (this.ready) {
      this.write('DE:\n');
    }
  }

  private onData(data: string) {
    this.dateNow = +new Date;
    this.heartbeat = +new Date();
    if (data === 'READY') {
      this.ready = true;
    }
    if (data.includes(':')) {
      const command = [
        data.substring(0, data.indexOf(':')), // Command
        data.substring(data.indexOf(':') + 1) // Value
      ];
      if (this.VALID_STATUS_COMMANDS.includes(command[0])) {
        this.status[command[0]] = Number(command[1]) !== NaN ? Number(command[1]) : command[1];
      }
    } else {
      console.log(`Non-status command got: ${data}`);
    }
    console.log(this.status);
  }

}
