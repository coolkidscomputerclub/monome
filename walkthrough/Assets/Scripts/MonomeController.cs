using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using LitJson;

public class MonomeController : MonoBehaviour {
	
	public  float startTime  = 0.0f; 
	public  float timePassed = 0.0f;
	public  int phase        = 0;
	public  int prev         = 8;
	private int amountRows   = 9;
	private int amountPerRow = 9;

	public string OSCHost   = "127.0.0.1";
	public int SendToPort   = 1338;
	public int ListenerPort = 8888;
	
	private UDPPacketIO udp;
	private Osc handler;
	
	private Stack<int> idBuffer = new Stack<int>();
	private Stack<int> stateBuffer = new Stack<int>();
	
	private bool sync = false;
	
	// Use this for initialization
	void Start () {
		GameObject monomeSquare = (GameObject) Resources.Load("Square");
		int row = 0;
		while (row < amountRows) {
			for (int i=0; i < amountPerRow; i++) {
				Vector3 pos = new Vector3((-i*1.2f),0, row*1.2f);
				GameObject clone = Instantiate(monomeSquare, gameObject.transform.position + pos, Quaternion.identity) as GameObject;
				clone.transform.parent = gameObject.transform;
				clone.SendMessage("SetID", (row * amountPerRow) + (i+1));
				clone.tag = "col" + (i+1);
			}
			row++;
		}
		
		if(udp = (UDPPacketIO) gameObject.GetComponent("UDPPacketIO")) {
			udp.init(OSCHost, SendToPort, ListenerPort);
			        
			handler = (Osc) gameObject.GetComponent("Osc");
			handler.init(udp);
			handler.SetAddressHandler("/press", IncomingValues);
			handler.SetAddressHandler("/sync", ResetTime);
		}
		
		OSCHandler.Instance.Init();
		
		startTime = Time.time;
	}
				
	void SendToSaul (string s) {
		OSCHandler.Instance.SendMessageToClient("Saul", "/press", s);
	}
	
	void IncomingValues(OscMessage msg) {
		// Debug.Log("Values! " + msg.Values[0]);
		JsonData change = JsonMapper.ToObject((string) msg.Values[0]);
		// Debug.Log("Change in " + change["location"]["name"]);
		int colour = -1;
		switch ((string) change["location"]["name"]) {
			/*
			case "blazey":
				colour = 1;
				break;
			*/
			case "austell":
				colour = 2;
				break;
			case "fowey":
				colour = 3;
				break;
		}
		if ((int) change["key"]["state"] == 0)
			colour = 0;
		UpdateSquare((int) change["key"]["id"], colour);
	}
	
	void UpdateSquare(int id, int state) {
		idBuffer.Push(id);
		stateBuffer.Push(state);
	}
	
	void ResetTime(OscMessage msg) {
		sync = true;
	} 
	
	// Update is called once per frame
	void Update () {
		
		if (sync) {
			startTime = Time.time;
			timePassed = 0f;
			sync = false;
			Debug.Log("SYNCHED UP");
		}
		
		while (idBuffer.Count > 0){
			
			int id = idBuffer.Pop();
			int state = stateBuffer.Pop();
			int row = (int) Mathf.Floor(id / 9);
			int col = id % amountPerRow;
			// Debug.Log("In row " + row + ", column " + col + "?");
			
			GameObject[] squares = GameObject.FindGameObjectsWithTag("col"+(col+1));
			squares[row].SendMessage("SetState", state);
			// Debug.Log(squares[row]);
			// Debug.Log(idBuffer.Count + " changes in buffer.");
		}
		
		timePassed += Time.deltaTime;
		if (timePassed >= 0.250f) {
			
			startTime = 0.0f;
			timePassed = 0.0f;
			prev = phase;
			phase++;
			if (phase > 8) {
				phase = 0;
				prev  = 8;
			}
			
			GameObject[] prevColumn = GameObject.FindGameObjectsWithTag("col"+(prev+1));
			foreach (GameObject square in prevColumn) {
				square.SendMessage("UnHighlight");
			}
			
			GameObject[] column = GameObject.FindGameObjectsWithTag("col"+(phase+1));
			foreach (GameObject square in column) {
				square.SendMessage("Highlight");
			}
			
		}
		
		 if (Input.GetKeyDown(KeyCode.H))
            SendToSaul("HELLO SAUL!");

	}
	
}
