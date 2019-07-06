import { Injectable } from '@angular/core';
import { ElectronService } from '../providers/electron.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public serialPort;
  public parser;
  public ports: Array<any>;
  public state = false;
  public ready: boolean;

  constructor(private electronService: ElectronService) {
    this.ready = false;
    setInterval(() => {
      console.log(this.ready)
      if (this.ready) {
        this.updateStatus();
      }
    }, 250);
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
      this.ready = false;
      this.close();
    }
    this.serialPort = new this.electronService.serialPort(comName, {
      parity: 'odd'
    });
    this.parser = this.serialPort.pipe(new this.electronService.serialPort.parsers.Readline({delimiter:'\n'}))
    this.serialPort.on('open', () => {
      this.state = this.serialPort.isOpen;
    });
    this.parser.on('data', this.onData);
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
    this.serialPort.write(data);
  }

  public updateStatus() {
    this.write('DE:\n');
  }

  private onData(data) {
    if (data === 'READY') {
      this.ready = true;
    }
    console.log(this.ready, data);
  }

}
